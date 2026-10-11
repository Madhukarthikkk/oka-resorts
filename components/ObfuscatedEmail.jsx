'use client';

import { useEffect, useState } from 'react';

// The address is never written in the page HTML, so simple spam bots that scrape
// "mailto:" links cannot collect it. It is put together in the visitor's browser.
const USER = 'amidevelopers';
const HOST = 'gmail.com';

export default function ObfuscatedEmail({ className, children, subject, showAddress = false }) {
  const [addr, setAddr] = useState('');
  useEffect(() => setAddr(`${USER}@${HOST}`), []);

  const href = addr
    ? `mailto:${addr}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`
    : '#contact';

  return (
    <a className={className} href={href}>
      {showAddress ? addr || `${USER} [at] ${HOST.replace('.', ' [dot] ')}` : children}
    </a>
  );
}
