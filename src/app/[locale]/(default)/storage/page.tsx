import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { SearchBar } from '@/components/ui/SearchBar';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('storage'),
  };
}

export default function StoragePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <h1>Storage</h1>
      <SearchBar />
    </>
  );
}
