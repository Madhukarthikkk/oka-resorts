import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';
import { getGalleryEvents } from '@/lib/gallery';

// Re-check the database every 30 seconds, so a new update shows up shortly after the host posts it.
export const revalidate = 30;

export const metadata = {
  title: 'Gallery & Updates — Oka Resorts, Reddipalli, Visakhapatnam',
  description:
    'Latest updates from Oka Resorts — plot sales announcements, puja ceremonies and site events at Reddipalli, Padmanabham, Visakhapatnam.',
};

export default async function GalleryPage() {
  const events = await getGalleryEvents();

  return (
    <main>
      <section id="gallery">
        <div className="wrap">
          <Link className="gal-back" href="/">&larr; Back to home</Link>
          <div className="eyebrow reveal">Gallery &amp; Updates</div>
          <h1 className="reveal" style={{ fontSize: 'clamp(34px,4.4vw,56px)', maxWidth: '760px', margin: '6px 0 16px' }}>
            Latest from Oka Resorts
          </h1>
          <p className="reveal gal-lede">
            Plot sales announcements, ceremonies and site events &mdash; posted here as they happen.
          </p>
          <div style={{ height: 34 }} />
          <GalleryGrid events={events} />
        </div>
      </section>
    </main>
  );
}
