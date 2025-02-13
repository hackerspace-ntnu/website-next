'use client';

import { Combobox } from '@/components/ui/Combobox';
import { useQueryState } from 'nuqs';
import { parseAsString } from 'nuqs/server';

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
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false, clearOnDefault: true }),
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
      initialValue={category}
      ariaLabel={t.defaultDescription}
    />
  );
}

export { CategorySelector };
