import ObfuscatedEmail from '@/components/ObfuscatedEmail';

export default function Footer() {
  return (
    <>
      <footer id="contact">
        <div className="wrap foot-grid">
          <div className="on-dark reveal">
            <div className="eyebrow">Enquire</div>
            <h2>Today is the right time to invest for your family.</h2>
            <p>For plot availability, pricing and a site visit to Reddipalli, Padmanabham — call us, send a message on WhatsApp, or write to us.</p>
            <ObfuscatedEmail className="big-email" subject="Oka Resorts Enquiry" showAddress />
            <div className="contact-pills">
              <a className="pill" href="https://wa.me/917093520183?text=Hi%2C%20I%27m%20interested%20in%20Oka%20Resorts" target="_blank" rel="noopener"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.4.66 4.63 1.8 6.55L4 29l7.62-1.75a11.9 11.9 0 0 0 4.4.84h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.86h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.52 1.04 1.07-4.41-.24-.38a9.83 9.83 0 0 1-1.5-5.5c0-5.46 4.45-9.9 9.92-9.9 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.47-4.45 9.86-9.9 9.86zm5.44-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.9-2.2-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.1 4.5.71.3 1.27.49 1.7.62.72.23 1.36.2 1.88.12.57-.08 1.76-.72 2-1.4.25-.7.25-1.3.17-1.4-.07-.13-.27-.2-.57-.35z"/></svg>WhatsApp</a>
              <a className="pill" href="tel:+917093520183"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>+91 70935 20183</a>
              <a className="pill" href="https://www.instagram.com/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.25 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5z"/></svg>Instagram</a>
              <ObfuscatedEmail className="pill" subject="Oka Resorts Enquiry"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/></svg>Email</ObfuscatedEmail>
            </div>
          </div>
        </div>
      </footer>

      <div className="mobile-cta-bar">
        <a href="tel:+917093520183">Call</a>
        <a href="https://wa.me/917093520183" target="_blank" rel="noopener">WhatsApp</a>
        <a href="/#contact">Enquire</a>
      </div>
    </>
  );
}
