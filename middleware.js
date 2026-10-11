import { NextResponse } from 'next/server';

// Light bot protection that runs before any page is built.
// Real search engines (Google, Bing) and WhatsApp/Facebook link previews are NOT blocked.

// Vulnerability scanners and aggressive scrapers that bring no visitors
const BAD_BOTS =
  /(sqlmap|nikto|nmap|masscan|zgrab|acunetix|netsparker|havij|dirbuster|gobuster|wpscan|nuclei|MJ12bot|AhrefsBot|SemrushBot|DotBot|PetalBot|Bytespider|DataForSeoBot|BLEXBot|MegaIndex|Scrapy)/i;

// Addresses only hackers' scripts ask for (this site has none of them)
const PROBES =
  /^\/(wp-admin|wp-login|wp-content|wp-includes|xmlrpc|phpmyadmin|cgi-bin|boaform|actuator|\.env|\.git|\.aws|vendor\/phpunit)|\.(php|asp|aspx|jsp|cgi|sql|bak)$/i;

// Gentle per-visitor limit for /admin page loads (per server instance)
const WINDOW_MS = 60_000;
const MAX_ADMIN_HITS = 30;
const hits = new Map();

function tooMany(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) {
    hits.set(ip, { start: now, n: 1 });
    if (hits.size > 5000) hits.clear();
    return false;
  }
  rec.n += 1;
  return rec.n > MAX_ADMIN_HITS;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get('user-agent') || '';

  if (BAD_BOTS.test(ua) || PROBES.test(pathname)) {
    return new NextResponse('Not found', { status: 404 });
  }

  if (pathname.startsWith('/admin')) {
    const ip = (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
    if (tooMany(ip)) {
      return new NextResponse('Too many requests. Please wait a minute and try again.', {
        status: 429,
        headers: { 'Retry-After': '60' },
      });
    }
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images/|favicon.svg|favicon.ico|Oka-Resorts-Brochure.pdf).*)'],
};
