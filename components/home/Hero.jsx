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
                <p className="lede">An 80-acre plotted farmhouse and resort community set along the Padmanabham–Bhogapuram road — 222 plots with clear title, ready for registration today.</p>
                <div className="hero-ctas">
                  <a href="/#contact" className="btn btn-solid">Enquire Now</a>
                  <a href="/#masterplan" className="btn">View Master Plan</a>
                  <a href="/Oka-Resorts-Brochure.pdf" className="btn" target="_blank" rel="noopener">Download Brochure</a>
                </div>
                <div className="stat-strip">
                  <div><b>80</b><span>Acres</span></div>
                  <div><b>222</b><span>Plots</span></div>
                  <div><b>100%</b><span>Clear Title</span></div>
                  <div><b>50&prime;&nbsp;/&nbsp;30&prime;</b><span>Wide Roads</span></div>
                </div>
              </div>
              <div className="hero-photo reveal">
                <Image src="/images/hero-2.jpg" alt="Oka Resorts plotted development at Reddipalli, Padmanabham — layout map and farmhouse" width={1572} height={1001} priority sizes="(max-width: 900px) 100vw, 56vw" />
              </div>
            </div>
          </div>
        </section>
    </>
  );
}