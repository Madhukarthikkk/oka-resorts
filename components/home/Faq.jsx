export default function Faq() {
  return (
    <>
      <section id="faq">
          <div className="wrap">
            <div className="eyebrow reveal">Frequently asked</div>
            <h2 className="reveal" style={{ fontSize: "clamp(28px,3.4vw,40px)", maxWidth: "560px", marginBottom: "10px" }}>Before you visit, a few common questions.</h2>
            <div className="faq-list reveal">
              <details className="faq-item">
                <summary>Is the title on these plots clear?</summary>
                <p>Yes — every plot at Oka Resorts is presented with a 100% clear title and is ready for registration. Ask for the relevant title documents during your site visit or through the contact section below.</p>
              </details>
              <details className="faq-item">
                <summary>Can I visit the site before booking?</summary>
                <p>Yes. Site visits to Reddipalli, Padmanabham can be arranged — message us on WhatsApp, call, or email to schedule a convenient date.</p>
              </details>
              <details className="faq-item">
                <summary>Are home loans available against these plots?</summary>
                <p>Several nationalised and private banks offer loans against clear-title residential plots. Loan eligibility and terms depend on the bank and your profile — we can help connect you with financing options on request.</p>
              </details>
              <details className="faq-item">
                <summary>When will the clubhouse, guest house and other amenities be built?</summary>
                <p>Plots are being registered now; community amenities such as the clubhouse, guest house and restaurant are planned for subsequent phases as the project is built out. Contact us for the latest phase-wise timeline.</p>
              </details>
              <details className="faq-item">
                <summary>What is included at the time of registration?</summary>
                <p>Buyers receive the standard sale deed and registration documentation for their plot. Specific inclusions can vary — our team will walk you through the full documentation checklist before you commit.</p>
              </details>
            </div>
          </div>
        </section>
    </>
  );
}
