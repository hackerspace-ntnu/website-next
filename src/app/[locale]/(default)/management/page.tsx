import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { CategoryCard } from '@/components/management/CategoryCard';
import type { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('management');

  return {
    title: t('title'),
  };
}

export default async function ManagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management');
  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const cards: {
    name: string;
    description: string;
    href: React.ComponentProps<typeof Link>['href'];
    className?: string;
  }[] = [
    {
      name: t('skills.name'),
      description: t('skills.description'),
      href: '/management/skills',
    },
    {
      name: t('users.name'),
      description: t('users.description'),
      href: '/management/users',
    },
    {
      name: t('files.name'),
      description: t('files.description'),
      href: '#' as React.ComponentProps<typeof Link>['href'],
      className: 'pointer-events-auto cursor-not-allowed',
    },
    {
      name: t('banners.name'),
      description: t('banners.description'),
      href: '/management/banners',
    },
    {
      name: t('slides.name'),
      description: t('slides.description'),
      href: '/management/slides',
    },
  ];

  return (
    <div className='min-h-screen'>
      <h1 className='text-center'>{t('title')}</h1>
      <div className='my-4 grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {cards.map(({ name, description, href, className }) => (
          <CategoryCard
            key={name}
            name={name}
            description={description}
            href={href}
            className={className}
          />
        ))}
      </div>
    </div>
  );
}
