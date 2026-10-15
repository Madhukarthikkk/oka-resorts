import Link from 'next/link';
import PanoeeTour from '@/components/PanoeeTour';

export const metadata = {
  title: '360° View — Oka Resorts, Reddipalli, Visakhapatnam',
  description:
    'Take a 360° virtual tour of Oka Resorts, the 80-acre plotted farmhouse and resort community at Reddipalli, Padmanabham, Visakhapatnam.',
};

export default function View360Page() {
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
            Look around the project from wherever you are. Drag the view, or move your phone, to explore in every direction.
          </p>
          <div style={{ height: 34 }} />

          <div className="tour-frame reveal">
            <PanoeeTour />
          </div>
        </div>
      </section>
    </main>
  );
}