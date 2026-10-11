
import Link from 'next/link';
import { toEmbedUrl } from '@/lib/embed';

export const metadata = {
  title: '360° View — Oka Resorts, Reddipalli, Visakhapatnam',
  description:
    'Take a 360° virtual tour of Oka Resorts, the 32-acre plotted farmhouse and resort community at Reddipalli, Padmanabham, Visakhapatnam.',
};

// ➜ PASTE YOUR 360° VIDEO LINK BETWEEN THE QUOTES BELOW.
//   A normal YouTube or Vimeo link works, or any "embed" link. Leave it empty to show "coming soon".
//   Example:  const VIDEO_URL = 'https://www.youtube.com/watch?v=XXXXXXXXXXX';
const VIDEO_URL = '';

export default function View360Page() {
  const embedUrl = toEmbedUrl(VIDEO_URL);

  return (
    <main>
      <section id="tour">
        <div className="wrap">
          <Link className="gal-back" href="/">&larr; Back to home</Link>
          <div className="eyebrow reveal">Virtual tour</div>
          <h1 className="reveal" style={{ fontSize: 'clamp(34px,4.4vw,56px)', maxWidth: '760px', margin: '6px 0 16px' }}>
            360&deg; View of Oka Resorts
          </h1>
          <p className="reveal gal-lede">
            Look around the project from wherever you are. Drag the video, or move your phone, to explore in every direction.
          </p>
          <div style={{ height: 34 }} />

          <div className="tour-frame reveal">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="360° view of Oka Resorts"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <div className="tour-soon">
                <span className="tour-icon" aria-hidden="true">360&deg;</span>
                <p>The 360&deg; video is coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
