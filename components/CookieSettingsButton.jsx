'use client';

import { openCookieSettings } from '@/lib/consent';

// Small footer link that lets visitors change their cookie choice later.
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit', textDecoration: 'underline' }}
    >
      Cookie settings
    </button>
  );
}
