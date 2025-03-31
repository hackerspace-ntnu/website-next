import { CategoriesTable } from '@/components/storage/CategoriesTable';
import { api } from '@/lib/api/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
  setRequestLocale(locale);

  const t = await getTranslations('storage.categories');

  const auth = await api.auth.state();

  if (
    !auth.user?.groups.some((g) =>
      ['labops', 'leadership', 'admin'].includes(g),
    )
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unathorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const categories = await api.storage.fetchItemCategories();

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h1 className='text-center'>{t('title')}</h1>
      <CategoriesTable categories={categories} />
    </div>
  );
}
