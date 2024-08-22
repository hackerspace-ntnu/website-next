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

const categories = [
  {
    value: 'popularity',
    label: 'Popularitet',
  },
  {
    value: 'sortDescending',
    label: 'Lagerbeholdning (Synkende)',
  },
  {
    value: 'sortAscending',
    label: 'Lagerbeholdning (Stigende)',
  },
  {
    value: 'name',
    label: 'Navn (alfabetisk)',
  },
];

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
      <Combobox
        choices={categories}
        defaultDescription='Velg sortering...'
        defaultPlaceholder='Søk etter filtere...'
      />
    </>
  );
}
