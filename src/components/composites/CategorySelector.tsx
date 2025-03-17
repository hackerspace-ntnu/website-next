'use client';

import { Combobox } from '@/components/ui/Combobox';
import { useQueryState } from 'nuqs';
import { parseAsInteger } from 'nuqs/server';

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
    parseAsInteger
      .withDefault(-1)
      .withOptions({ shallow: false, clearOnDefault: true }),
  );

  function valueCallback(category: string | null) {
    const categoryToSet = categories.findIndex((c) => c.label === category);
    setCategory(categoryToSet !== -1 ? categoryToSet + 1 : -1);
  }

  return (
    <Combobox
      choices={categories}
      defaultDescription={t.defaultDescription}
      defaultPlaceholder={t.defaultPlaceholder}
      buttonClassName='w-full lg:w-[250px]'
      contentClassName='w-full lg:w-[200px]'
      valueCallback={valueCallback}
      initialValue={categories[category]?.value}
      ariaLabel={t.defaultDescription}
    />
  );
}

export { CategorySelector };
