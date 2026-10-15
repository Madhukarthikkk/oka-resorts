'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics 4.
// Setup: put your Measurement ID (looks like G-XXXXXXXXXX) in the environment variable
// NEXT_PUBLIC_GA_ID  (in .env.local on your computer, and in your hosting dashboard for the live site).
// With no ID set, nothing is loaded and nothing is tracked.
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

export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
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
  }, []);

  if (!GA_ID) return null;

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
