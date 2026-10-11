'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase, supabaseConfigured } from '@/lib/supabase';

const TAGS = ['Ceremonies', 'Plot Sales', 'Events'];
const BUCKET = 'gallery';

const today = () => new Date().toISOString().slice(0, 10);

// Phone photos are huge; shrink them before upload so the gallery loads fast.
async function shrink(file, maxSide = 1600, quality = 0.82) {
  try {
    if (!file.type.startsWith('image/')) return file;
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(bmp, 0, 0, w, h);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', quality));
    return blob || file;
  } catch {
    return file;
  }
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="adm-wrap"><p className="adm-hint">Loading…</p></div>;

  if (!supabaseConfigured) {
    return (
      <div className="adm-wrap adm-login">
        <div className="adm-card">
          <h2>Setup needed</h2>
          <p className="adm-hint">
            Supabase is not connected yet. Add <b>NEXT_PUBLIC_SUPABASE_URL</b> and{' '}
            <b>NEXT_PUBLIC_SUPABASE_ANON_KEY</b> to the environment variables, then redeploy. See README.md.
          </p>
        </div>
      </div>
    );
  }

  return session ? <Dashboard /> : <Login />;
}

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const LOCK_KEY = 'oka_admin_lock';
const MAX_FAILS = 5;
const LOCK_SECONDS = 120;

function readLock() {
  try {
    return Number(localStorage.getItem(LOCK_KEY)) || 0;
  } catch {
    return 0;
  }
}
function writeLock(ts) {
  try {
    localStorage.setItem(LOCK_KEY, String(ts));
  } catch {}
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trap, setTrap] = useState(''); // hidden field: only bots fill it in
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [lockLeft, setLockLeft] = useState(0);

  const shownAt = useRef(0);
  const fails = useRef(0);
  const tsBox = useRef(null);
  const tsId = useRef(null);

  useEffect(() => {
    shownAt.current = Date.now();
    const left = Math.ceil((readLock() - Date.now()) / 1000);
    if (left > 0) setLockLeft(left);
  }, []);

  // countdown while locked
  useEffect(() => {
    if (lockLeft <= 0) return;
    const t = setInterval(() => {
      const left = Math.ceil((readLock() - Date.now()) / 1000);
      setLockLeft(left > 0 ? left : 0);
    }, 1000);
    return () => clearInterval(t);
  }, [lockLeft > 0]);

  // Cloudflare Turnstile (only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set)
  useEffect(() => {
    if (!TURNSTILE_KEY) return;
    let cancelled = false;
    function mount() {
      if (cancelled || !window.turnstile || !tsBox.current || tsId.current !== null) return;
      tsId.current = window.turnstile.render(tsBox.current, {
        sitekey: TURNSTILE_KEY,
        callback: (t) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      });
    }
    if (window.turnstile) {
      mount();
    } else {
      let el = document.querySelector('script[data-turnstile]');
      if (!el) {
        el = document.createElement('script');
        el.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        el.async = true;
        el.defer = true;
        el.dataset.turnstile = '1';
        document.head.appendChild(el);
      }
      el.addEventListener('load', mount);
    }
    return () => {
      cancelled = true;
      if (tsId.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(tsId.current);
        } catch {}
      }
      tsId.current = null;
    };
  }, []);

  function resetCaptcha() {
    setToken('');
    if (TURNSTILE_KEY && tsId.current !== null && window.turnstile) {
      try {
        window.turnstile.reset(tsId.current);
      } catch {}
    }
  }

  async function signIn(e) {
    e.preventDefault();
    setError('');

    // 1) bot traps: hidden field filled in, or form sent faster than a person could
    if (trap) {
      setError('That email or password is not correct.');
      return;
    }
    if (Date.now() - shownAt.current < 1200) {
      setError('Please wait a moment and try again.');
      return;
    }

    // 2) too many wrong passwords
    const left = Math.ceil((readLock() - Date.now()) / 1000);
    if (left > 0) {
      setLockLeft(left);
      return;
    }

    // 3) CAPTCHA (if switched on)
    if (TURNSTILE_KEY && !token) {
      setError('Please complete the security check first.');
      return;
    }

    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
      options: TURNSTILE_KEY ? { captchaToken: token } : undefined,
    });

    if (err) {
      const msg = String(err.message || '').toLowerCase();
      fails.current += 1;
      resetCaptcha();
      if (fails.current >= MAX_FAILS) {
        fails.current = 0;
        writeLock(Date.now() + LOCK_SECONDS * 1000);
        setLockLeft(LOCK_SECONDS);
      } else if (err.status === 429 || msg.includes('rate limit')) {
        setError('Too many attempts. Please wait a few minutes and try again.');
      } else if (msg.includes('captcha')) {
        setError('The security check failed. Please try again.');
      } else {
        setError('That email or password is not correct.');
      }
    }
    setBusy(false);
  }

  return (
    <div className="adm-wrap adm-login">
      <form className="adm-card" onSubmit={signIn} noValidate={false}>
        <h2>Gallery admin</h2>
        <p className="adm-hint">Sign in to add updates to the Oka Resorts gallery.</p>
        {lockLeft > 0 && (
          <p className="adm-msg err" role="alert">
            Too many wrong attempts. Please try again in {lockLeft} second{lockLeft === 1 ? '' : 's'}.
          </p>
        )}
        {error && lockLeft <= 0 && <p className="adm-msg err" role="alert">{error}</p>}
        <div className="adm-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="adm-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* Honeypot: invisible to people, bots fill it in and get rejected */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>

        {TURNSTILE_KEY && <div ref={tsBox} style={{ marginBottom: 18, minHeight: 65 }} />}

        <button className="adm-btn" type="submit" disabled={busy || lockLeft > 0}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const [title, setTitle] = useState('');
  const [tag, setTag] = useState(TAGS[0]);
  const [date, setDate] = useState(today());
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null); // { type: 'ok' | 'err', text }
  const fileRef = useRef(null);

  async function loadEvents() {
    const { data, error } = await supabase
      .from('gallery_events')
      .select('*')
      .order('event_date', { ascending: false })
      .order('created_at', { ascending: false });
    if (!error) setEvents(data || []);
    setLoadingList(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  async function publish(e) {
    e.preventDefault();
    setMsg(null);
    if (!title.trim()) return setMsg({ type: 'err', text: 'Please add a title.' });
    setBusy(true);

    const id = crypto.randomUUID();
    const uploadedPaths = [];
    const urls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const blob = await shrink(files[i]);
        const path = `${id}/${String(i + 1).padStart(2, '0')}.jpg`;
        const { error } = await supabase.storage
          .from(BUCKET)
          .upload(path, blob, { contentType: 'image/jpeg', upsert: false });
        if (error) throw error;
        uploadedPaths.push(path);
        urls.push(supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
      }

      const { error } = await supabase.from('gallery_events').insert({
        id,
        title: title.trim(),
        tag: tag.trim() || 'Events',
        event_date: date,
        body: body.trim(),
        images: urls,
        image_paths: uploadedPaths,
      });
      if (error) throw error;

      setTitle('');
      setBody('');
      setFiles([]);
      setDate(today());
      if (fileRef.current) fileRef.current.value = '';
      setMsg({ type: 'ok', text: 'Published. It will show on the gallery page within about 30 seconds.' });
      loadEvents();
    } catch (err) {
      if (uploadedPaths.length) await supabase.storage.from(BUCKET).remove(uploadedPaths);
      setMsg({ type: 'err', text: 'Could not publish: ' + (err.message || 'something went wrong') + '. Please try again.' });
    } finally {
      setBusy(false);
    }
  }

  async function remove(ev) {
    if (!window.confirm(`Delete "${ev.title}" and its photos? This cannot be undone.`)) return;
    setMsg(null);
    if (ev.image_paths && ev.image_paths.length) {
      await supabase.storage.from(BUCKET).remove(ev.image_paths);
    }
    const { error } = await supabase.from('gallery_events').delete().eq('id', ev.id);
    if (error) setMsg({ type: 'err', text: 'Could not delete: ' + error.message });
    else {
      setMsg({ type: 'ok', text: 'Deleted.' });
      loadEvents();
    }
  }

  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <h1>Gallery admin</h1>
        <div className="adm-top-actions">
          <a className="adm-btn ghost" href="/gallery" target="_blank" rel="noopener">View gallery</a>
          <button className="adm-btn ghost" type="button" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </div>

      {msg && <p className={'adm-msg ' + msg.type}>{msg.text}</p>}

      <form className="adm-card" onSubmit={publish}>
        <h2>Add an update</h2>
        <p className="adm-hint">One update = one card. Visitors click it to see all of its photos and your text.</p>

        <div className="adm-field">
          <label htmlFor="title">Title</label>
          <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Puja Ceremony" required />
        </div>

        <div className="adm-row">
          <div className="adm-field">
            <label htmlFor="tag">Label</label>
            <input id="tag" list="tag-list" value={tag} onChange={(e) => setTag(e.target.value)} />
            <datalist id="tag-list">
              {TAGS.map((t) => <option key={t} value={t} />)}
            </datalist>
          </div>
          <div className="adm-field">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>

        <div className="adm-field">
          <label htmlFor="body">Details</label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write what happened, or what visitors need to know." />
        </div>

        <div className="adm-field">
          <label htmlFor="photos">Photos</label>
          <input
            id="photos"
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
          {previews.length > 0 && (
            <div className="adm-previews">
              {previews.map((u) => <img key={u} src={u} alt="" />)}
            </div>
          )}
        </div>

        <button className="adm-btn" type="submit" disabled={busy}>{busy ? 'Publishing…' : 'Publish update'}</button>
      </form>

      <div className="adm-card">
        <h2>Published updates</h2>
        {loadingList && <p className="adm-hint">Loading…</p>}
        {!loadingList && events.length === 0 && <p className="adm-hint">Nothing published yet.</p>}
        {events.map((ev) => (
          <div className="adm-item" key={ev.id}>
            {ev.images && ev.images[0] ? <img src={ev.images[0]} alt="" /> : <div className="adm-noimg" />}
            <div className="adm-item-main">
              <b>{ev.title}</b>
              <span>{ev.tag} · {ev.event_date} · {(ev.images || []).length} photos</span>
            </div>
            <button className="adm-btn danger" type="button" onClick={() => remove(ev)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
