
// Turns a normal video link into one that can be shown inside the page.
// Accepts YouTube (watch, youtu.be, shorts, embed) and Vimeo links; any other https link is used as it is.
export function toEmbedUrl(input) {
  const raw = String(input || '').trim();
  if (!raw) return '';
  let url;
  try {
    url = new URL(raw);
  } catch {
    return '';
  }
  if (url.protocol !== 'https:') return '';

  const host = url.hostname.replace(/^www\./, '').replace(/^m\./, '');

  if (host === 'youtu.be') {
    const id = url.pathname.slice(1).split('/')[0];
    return id ? `https://www.youtube.com/embed/${id}` : '';
  }
  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') {
      const id = url.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : '';
    }
    const m = url.pathname.match(/^\/(shorts|live)\/([^/]+)/);
    if (m) return `https://www.youtube.com/embed/${m[2]}`;
    return raw; // already an /embed/ link
  }
  if (host === 'vimeo.com') {
    const id = url.pathname.slice(1).split('/')[0];
    return /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : raw;
  }
  return raw;
}
