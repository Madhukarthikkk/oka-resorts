// Remembers the visitor's cookie choice in their own browser (not on a server).
export const CONSENT_KEY = 'oka-cookie-consent';      // 'accepted' | 'declined'
export const CONSENT_EVENT = 'oka-consent-change';
export const OPEN_EVENT = 'oka-open-cookie-settings';

export function getConsent() {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'accepted' || v === 'declined' ? v : null;
  } catch (e) {
    return null;
  }
}

export function setConsent(value) {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
