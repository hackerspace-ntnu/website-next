import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CategoriesTable } from '@/components/storage/CategoriesTable';
import { api } from '@/lib/api/server';

export async function generateMetadata({
  params,
}: Pick<PageProps<'/[locale]/storage/categories'>, 'params'>) {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'storage',
  });

  return {
    title: `${t('title')}: ${t('categories.title')}`,
  };
}

export default async function StorageCategoriesPage({
  params,
}: PageProps<'/[locale]/storage/categories'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage.categories');

  const auth = await api.auth.state();

  if (
    !auth.user?.groups.some((g) =>
      ['labops', 'leadership', 'admin'].includes(g),
    )
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const categories = await api.storage.fetchItemCategories();

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <CategoriesTable categories={categories} />
    </div>
  );
}
