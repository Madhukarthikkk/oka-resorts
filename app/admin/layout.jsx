export const metadata = {
  title: 'Gallery admin — Oka Resorts',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="adm-shell">{children}</div>;
}
