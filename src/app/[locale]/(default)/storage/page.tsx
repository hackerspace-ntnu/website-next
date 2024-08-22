import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Combobox } from '@/components/ui/Combobox';
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
  const t = useTranslations('storage');

  const categories = [
    {
      value: 'popularity',
      label: t('combobox.popularity'),
    },
    {
      value: 'sortDescending',
      label: t('combobox.sortDescending'),
    },
    {
      value: 'sortAscending',
      label: t('combobox.sortAscending'),
    },
    {
      value: 'name',
      label: t('combobox.name'),
    },
  ];
  return (
    <>
      <h1>{t('title')}</h1>
      <SearchBar />
      <Combobox
        choices={categories}
        defaultDescription={t('combobox.defaultDescription')}
        defaultPlaceholder={t('combobox.defaultPlaceholder')}
      />
    </>
  );
}
