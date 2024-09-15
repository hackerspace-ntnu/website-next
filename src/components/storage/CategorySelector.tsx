'use client';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { createSearchParamsCache, parseAsString } from 'nuqs/parsers';
import { Combobox } from '../ui/Combobox';

type CategorySelectorProps = {
  categories: {
    value: string;
    label: string;
  }[];
  t: {
    category: string;
    sort: string;
    defaultDescription: string;
    defaultPlaceholder: string;
  };
};

function CategorySelector({ categories, t }: CategorySelectorProps) {
  const [category, setCategory] = useQueryState(
    t.category,
    parseAsString.withDefault(''),
  );

  function valueCallback(category: string | null) {
    setCategory(category);
  }

  return (
    <Combobox
      choices={categories}
      defaultDescription={t.defaultDescription}
      defaultPlaceholder={t.defaultPlaceholder}
      buttonClassName='w-full lg:w-[250px]'
      contentClassName='w-full lg:w-[200px]'
      valueCallback={valueCallback}
    />
  );
}

export { CategorySelector };