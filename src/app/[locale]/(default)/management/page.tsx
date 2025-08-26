import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type React from 'react';
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
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('management');
  const { user } = await api.auth.state();

  if (!user || !user.groups.includes('admin')) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const cards: {
    name: string;
    description: string;
    href: React.ComponentProps<typeof Link>['href'];
  }[] = [
    {
      name: t('skills.title'),
      description: t('skills.description'),
      href: '/management/skills',
    },
    {
      name: t('users.title'),
      description: t('users.description'),
      href: '/management',
    },
  ];

  return (
    <>
      <h1>{t('title')}</h1>
      <div className='my-4 grid grid-cols-2 gap-4'>
        {cards.map(({ name, description, href }) => (
          <CategoryCard
            key={name}
            name={name}
            description={description}
            href={href}
          />
        ))}
      </div>
    </>
  );
}
