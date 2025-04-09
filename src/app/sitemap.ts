import { env } from '@/env';
import { routing } from '@/lib/locale';
import { getPathname } from '@/lib/locale/navigation';
import type { MetadataRoute } from 'next';

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntry(href: Href, changefreq: string, priority: number) {
  return {
    url: getUrl(href, routing.defaultLocale),
    lastModified: new Date(),
    changefreq,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)]),
      ),
    },
  };
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });
  return `${env.NEXT_PUBLIC_SITE_URL}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    getEntry('/', 'yearly', 1.0),
    getEntry('/about', 'monthly', 0.8),
    getEntry('/news', 'weekly', 0.7),
    getEntry(
      {
        pathname: '/news/[article]',
        params: { article: '1' },
      },
      'daily',
      0.4,
    ),
    getEntry('/events', 'weekly', 0.7),
    getEntry('/storage', 'daily', 0.4),
    getEntry('/reservations', 'hourly', 0.8),
    getEntry(
      {
        pathname: '/reservations/[id]',
        params: { id: '' },
      },
      'hourly',
      0.8,
    ),
  ];
}
