import '@fontsource-variable/cinzel/index.css';
import '@fontsource-variable/mulish/index.css';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://okaresorts.com';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Oka Resorts — Farm Houses & Resorts, Reddipalli, Visakhapatnam',
  description:
    'Oka Resorts — a 32-acre plotted farmhouse and resort community at Reddipalli, Padmanabham, Visakhapatnam. 222 plots, 100% clear title, ready for registration.',
  openGraph: {
    title: 'Oka Resorts — Living in Nature, in Luxury',
    description: '222 plots across 32 acres at Reddipalli, Padmanabham, Visakhapatnam. Clear title, ready for registration.',
    images: ['/images/hero.jpg'],
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F4EFE2',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,400&family=Cormorant+Garamond:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
