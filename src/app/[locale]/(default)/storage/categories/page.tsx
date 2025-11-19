import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { CategoriesTable } from '@/components/storage/CategoriesTable';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('storage');

  return {
    title: `${t('title')}: ${t('categories.title')}`,
  };
}

export default async function StorageCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage.categories');

  const { user } = await api.auth.state();

  if (
    !user?.groups.some((g) => ['labops', 'management', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const categories = await api.storage.fetchItemCategories();

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <CategoriesTable categories={categories} />
    </div>
  );
}
