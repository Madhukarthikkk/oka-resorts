'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getConsent, CONSENT_EVENT } from '@/lib/consent';

// Google Analytics 4.
// Setup: put your Measurement ID (looks like G-XXXXXXXXXX) in the environment variable
// NEXT_PUBLIC_GA_ID  (in .env.local on your computer, and in your hosting dashboard for the live site).
// With no ID set, nothing is loaded and nothing is tracked.
// Even with an ID, nothing is loaded until the visitor clicks "Accept" on the cookie banner.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function track(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}

// Which clicks matter for a plot-sales site: enquiries, brochure, map.
function classify(a) {
  const href = a.getAttribute('href') || '';
  if (/^tel:/i.test(href)) return ['call_click', { link_url: href }];
  if (/^mailto:/i.test(href)) return ['email_click', { link_url: href }];
  if (/wa\.me|whatsapp\.com/i.test(href)) return ['whatsapp_click', { link_url: href.split('?')[0] }];
  if (/\.pdf($|\?)/i.test(href)) return ['brochure_download', { file_name: href.split('/').pop() }];
  if (/google\.[a-z.]+\/maps|maps\.app\.goo\.gl/i.test(href)) return ['directions_click', { link_url: 'google_maps' }];
  if (/instagram\.com/i.test(href)) return ['instagram_click', { link_url: href }];
  if (/^\/360-view/.test(href)) return ['view_360_click', { link_url: href }];
  return null;
}

// Remove Google Analytics cookies (used when a visitor declines or withdraws consent)
function clearGaCookies() {
  const host = window.location.hostname;
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
      [host, '.' + host, ''].forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? '; domain=' + d : ''}`;
      });
    }
  });
}

export default function Analytics() {
  const [consent, setConsentState] = useState(null);

  useEffect(() => {
    const read = () => setConsentState(getConsent());
    read();
    window.addEventListener(CONSENT_EVENT, read);
    return () => window.removeEventListener(CONSENT_EVENT, read);
  }, []);

  const allowed = Boolean(GA_ID) && consent === 'accepted';

  useEffect(() => {
    if (GA_ID && consent === 'declined') {
      window['ga-disable-' + GA_ID] = true;
      clearGaCookies();
    } else if (GA_ID && consent === 'accepted') {
      window['ga-disable-' + GA_ID] = false;
    }
  }, [consent]);

  useEffect(() => {
    if (!allowed) return;
    function onClick(e) {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const hit = classify(a);
      if (!hit) return;
      track(hit[0], {
        ...hit[1],
        link_text: (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 60),
        page_path: window.location.pathname,
      });
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [allowed]);

  if (!allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
