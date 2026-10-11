'use client';

import { useEffect, useState } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(d) {
  if (!d) return '';
  const [y, m, day] = String(d).split('-');
  if (!y || !m || !day) return String(d);
  return `${parseInt(day, 10)} ${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

// The text comes with a blank line between paragraphs.
function paragraphs(text) {
  return String(text || '').split(/\n{2,}/).map((t) => t.trim()).filter(Boolean);
}

function Cover({ src, alt, tag }) {
  const [state, setState] = useState('loading'); // loading | loaded | failed
  return (
    <>
      {state !== 'loaded' && <div className="gal-ph">{tag}</div>}
      {src && state !== 'failed' && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
        />
      )}
    </>
  );
}

export default function GalleryGrid({ events }) {
  const [active, setActive] = useState(null);
  const [idx, setIdx] = useState(0);

  const pics = active ? active.images || [] : [];

  function open(ev) {
    setActive(ev);
    setIdx(0);
  }
  function close() {
    setActive(null);
  }
  function step(delta) {
    if (!pics.length) return;
    setIdx((i) => (i + delta + pics.length) % pics.length);
  }

  useEffect(() => {
    if (!active) return;
    const total = (active.images || []).length;
    function onKey(e) {
      if (e.key === 'Escape') setActive(null);
      if (!total) return;
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % total);
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  if (!events.length) {
    return (
      <div className="gal-grid">
        <p className="gal-empty">No updates yet &mdash; please check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="gal-grid">
        {events.map((ev) => {
          const list = ev.images || [];
          return (
            <button type="button" className="gal-card" key={ev.id} onClick={() => open(ev)}>
              <div className="gal-media">
                <Cover src={list[0]} alt={ev.title} tag={ev.tag} />
                {list.length > 1 && <div className="gal-badge">{list.length} photos</div>}
              </div>
              <div className="gal-body">
                <div className="gal-meta">
                  <span>{ev.tag}</span>
                  {ev.event_date && <span>{formatDate(ev.event_date)}</span>}
                </div>
                <h3>{ev.title}</h3>
                {ev.body && <p>{paragraphs(ev.body)[0]}</p>}
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="gal-modal open" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="gal-modal-box" role="dialog" aria-modal="true" aria-labelledby="gal-modal-title">
            <button type="button" className="gal-modal-close" aria-label="Close" onClick={close}>&times;</button>

            {pics.length > 0 && (
              <div className={'gal-viewer' + (pics.length < 2 ? ' single' : '')}>
                <img src={pics[idx]} alt={active.title} />
                <button type="button" className="gal-nav gal-prev" aria-label="Previous photo" onClick={() => step(-1)}>&#8249;</button>
                <button type="button" className="gal-nav gal-next" aria-label="Next photo" onClick={() => step(1)}>&#8250;</button>
                <div className="gal-count">{idx + 1} / {pics.length}</div>
              </div>
            )}

            {pics.length > 1 && (
              <div className="gal-thumbs">
                {pics.map((src, n) => (
                  <button
                    type="button"
                    key={src}
                    className={'gal-thumb' + (n === idx ? ' active' : '')}
                    aria-label={`Photo ${n + 1}`}
                    onClick={() => setIdx(n)}
                  >
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}

            <div className="gal-modal-body">
              <div className="gal-meta">
                <span>{active.tag}</span>
                {active.event_date && <span>{formatDate(active.event_date)}</span>}
              </div>
              <h3 id="gal-modal-title">{active.title}</h3>
              {paragraphs(active.body).map((t, i) => <p key={i}>{t}</p>)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
