import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Page not found — Oka Resorts',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="nf">
          <div className="wrap">
            <div className="nf-inner">
              <div className="eyebrow">Error 404</div>
              <div className="nf-code" aria-hidden="true">404</div>
              <h1>This plot isn&rsquo;t on our map.</h1>
              <p>
                The page you are looking for may have moved or never existed. Head back to the home page,
                see the latest from the site, or get in touch and we will point you in the right direction.
              </p>
              <div className="hero-ctas">
                <Link href="/" className="btn btn-solid">Back to home</Link>
                <Link href="/gallery" className="btn">View gallery</Link>
                <a href="/#contact" className="btn">Contact us</a>
              </div>
              <nav className="nf-links" aria-label="Popular pages">
                <b>Popular pages</b>
                <a href="/#location">Location</a>
                <a href="/#masterplan">Master plan</a>
                <a href="/#amenities">Amenities</a>
                <Link href="/360-view">360&deg; view</Link>
                <a href="/#faq">FAQ</a>
              </nav>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
