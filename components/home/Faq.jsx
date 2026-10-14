'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Is the title on these plots clear?',
    a: 'Yes — every plot at Oka Resorts is presented with a 100% clear title and is ready for registration. Ask for the relevant title documents during your site visit or through the contact section below.',
  },
  {
    q: 'Can I visit the site before booking?',
    a: 'Yes. Site visits to Reddipalli, Padmanabham can be arranged — message us on WhatsApp, call, or email to schedule a convenient date.',
  },
  {
    q: 'Are home loans available against these plots?',
    a: 'Several nationalised and private banks offer loans against clear-title residential plots. Loan eligibility and terms depend on the bank and your profile — we can help connect you with financing options on request.',
  },
  {
    q: 'When will the clubhouse, guest house and other amenities be built?',
    a: 'Plots are being registered now; community amenities such as the clubhouse, guest house and restaurant are planned for subsequent phases as the project is built out. Contact us for the latest phase-wise timeline.',
  },
  {
    q: 'What is included at the time of registration?',
    a: 'Buyers receive the standard sale deed and registration documentation for their plot. Specific inclusions can vary — our team will walk you through the full documentation checklist before you commit.',
  },
];

export default function Faq() {
  const [i, setI] = useState(0);
  const total = FAQS.length;
  const prev = () => setI((n) => (n - 1 + total) % total);
  const next = () => setI((n) => (n + 1) % total);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  return (
    <section id="faq">
      <div className="wrap">
        <div className="eyebrow reveal">Frequently asked</div>
        <h2 className="reveal" style={{ fontSize: 'clamp(28px,3.4vw,40px)', maxWidth: '560px', marginBottom: '10px' }}>
          Before you visit, a few common questions.
        </h2>

        <div className="faq-carousel reveal" role="group" aria-roledescription="carousel" aria-label="Frequently asked questions" onKeyDown={onKey}>
          <button type="button" className="faq-nav faq-nav-prev" onClick={prev} aria-label="Previous question">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>

          <div className="faq-card" aria-live="polite">
            {FAQS.map((f, n) => (
              <div key={f.q} className={'faq-slide' + (n === i ? ' is-active' : '')} aria-hidden={n === i ? 'false' : 'true'}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>

          <button type="button" className="faq-nav faq-nav-next" onClick={next} aria-label="Next question">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}