const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://okaresorts.com';

export default function sitemap() {
  return [
    { url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/gallery`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/360-view`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/privacy-and-cookies`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
