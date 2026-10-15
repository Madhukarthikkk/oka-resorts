'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getConsent, setConsent, OPEN_EVENT } from '@/lib/consent';

// Cookie banner. Analytics (Google Analytics) is switched on only after "Accept".
export default function CookieConsent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open || (pathname || '').startsWith('/admin')) return null;

  const choose = (value) => {
    setConsent(value);
    setOpen(false);
  };

  return (
    <>
      <style>{`
        .cc-banner{position:fixed;left:16px;bottom:16px;z-index:70;max-width:440px;background:var(--forest-deep,#1D392E);color:var(--paper,#F4EFE2);border:1px solid rgba(244,239,226,.18);border-radius:16px;padding:18px 20px;box-shadow:0 12px 34px rgba(0,0,0,.28);font-family:'Cormorant Garamond',serif;font-weight:500;font-size:18px;line-height:1.4}
        .cc-banner h2{font-family:'Fraunces',serif;font-weight:600;font-size:20px;margin:0 0 6px;color:var(--paper,#F4EFE2)}
        .cc-banner p{margin:0 0 14px}
        .cc-banner a{color:inherit;text-decoration:underline}
        .cc-actions{display:flex;gap:10px;flex-wrap:wrap}
        .cc-btn{cursor:pointer;border-radius:999px;padding:10px 22px;font:inherit;font-size:16px;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--paper,#F4EFE2);background:transparent;color:var(--paper,#F4EFE2)}
        .cc-btn:hover{background:rgba(244,239,226,.14)}
        .cc-btn.cc-accept{background:var(--paper,#F4EFE2);color:var(--forest-deep,#1D392E)}
        .cc-btn.cc-accept:hover{background:#fff}
        .cc-btn:focus-visible{outline:2px solid var(--paper,#F4EFE2);outline-offset:2px}
        @media (max-width:720px){
          .cc-banner{left:12px;right:12px;max-width:none;bottom:calc(56px + env(safe-area-inset-bottom,0px) + 10px);padding:16px}
        }
      `}</style>
      <div className="cc-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
        <h2>We use cookies</h2>
        <p>
          With your permission we use analytics cookies to see which pages and buttons are used, so we can improve this website.
          If you decline, no analytics cookies are used. Read our <Link href="/privacy-and-cookies">Privacy &amp; Cookies</Link> page.
        </p>
        <div className="cc-actions">
          <button type="button" className="cc-btn" onClick={() => choose('declined')}>Decline</button>
          <button type="button" className="cc-btn cc-accept" onClick={() => choose('accepted')}>Accept</button>
        </div>
      </div>
    </>
  );
}
