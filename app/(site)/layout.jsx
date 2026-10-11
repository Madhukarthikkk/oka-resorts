import Loader from '@/components/Loader';
import WhatsAppFab from '@/components/WhatsAppFab';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';

export default function SiteLayout({ children }) {
  return (
    <>
      <Loader />
      <WhatsAppFab />
      <Header />
      {children}
      <Footer />
      <RevealObserver />
    </>
  );
}
