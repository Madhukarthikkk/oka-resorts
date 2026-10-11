import Image from 'next/image';

export default function Hero() {
  return (
    <>
      <section className="hero">
          <div className="wrap">
            <div className="hero-grid">
              <div className="reveal">
                <div className="eyebrow">Reddipalli · Padmanabham · Visakhapatnam</div>
                <h1>Living in nature,<br /><span className="italic">in luxury.</span></h1>
                <p className="lede">A 32-acre plotted farmhouse and resort community set along the Padmanabham–Bhogapuram road — 222 plots with clear title, ready for registration today.</p>
                <div className="hero-ctas">
                  <a href="/#contact" className="btn btn-solid">Enquire Now</a>
                  <a href="/#masterplan" className="btn">View Master Plan</a>
                  <a href="/Oka-Resorts-Brochure.pdf" className="btn" target="_blank" rel="noopener">Download Brochure</a>
                </div>
                <div className="stat-strip">
                  <div><b>32</b><span>Acres</span></div>
                  <div><b>222</b><span>Plots</span></div>
                  <div><b>100%</b><span>Clear Title</span></div>
                  <div><b>50'&nbsp;/&nbsp;30'</b><span>Wide Roads</span></div>
                </div>
              </div>
              <div className="hero-photo reveal">
                <Image src="/images/hero.jpg" alt="Family enjoying open green space at Oka Resorts, Reddipalli" width={1168} height={1346} priority sizes="(max-width: 900px) 100vw, 48vw" />
                <div className="tag">Reddipalli, Padmanabham</div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
