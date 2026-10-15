import Link from 'next/link';

// Shared layout for the Terms and Privacy pages.
// The top of the page (back link, label, heading, intro) follows the Gallery page exactly.
const h2 = {
  fontSize: 'clamp(20px, 2.2vw, 26px)',
  margin: '30px 0 8px',
  color: 'var(--ink)',
};
const body = {
  color: 'var(--ink-soft)',
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 1.5,
  margin: '0 0 10px',
};

// A <div> (not <section>) on purpose: the site gives every <section> 110px of padding,
// which caused the big gaps between points.
export function Section({ title, children }) {
  return (
    <div>
      <h2 style={h2}>{title}</h2>
      {children}
    </div>
  );
}

export function Text({ children }) {
  return <p style={body}>{children}</p>;
}

export function List({ items }) {
  return (
    <ul style={{ ...body, paddingLeft: 22, margin: '0 0 10px' }}>
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: 6 }}>{it}</li>
      ))}
    </ul>
  );
}

export default function LegalPage({ eyebrow, title, updated, intro, children }) {
  return (
    <main>
      {/* paddingTop 44px = same top spacing as the Gallery and 360 View pages */}
      <section style={{ paddingTop: 44 }}>
        <div className="wrap">
          <Link className="gal-back" href="/">&larr; Back to home</Link>
          <div className="eyebrow reveal">{eyebrow}</div>
          <h1 className="reveal" style={{ fontSize: 'clamp(34px,4.4vw,56px)', maxWidth: '760px', margin: '6px 0 16px' }}>
            {title}
          </h1>
          {intro && <p className="reveal gal-lede">{intro}</p>}
          <p style={{ ...body, fontSize: 17, margin: '14px 0 0' }}>Last updated: {updated}</p>
          <div style={{ maxWidth: 860, marginTop: 10 }}>{children}</div>
        </div>
      </section>
    </main>
  );
}