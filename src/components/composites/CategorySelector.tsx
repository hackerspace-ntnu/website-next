'use client';

import { Combobox } from '@/components/ui/Combobox';
import { Skeleton } from '@/components/ui/Skeleton';
import { useQueryState } from 'nuqs';
import { parseAsInteger } from 'nuqs/server';
import { useTransition } from 'react';

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
  const [isLoading, startTransition] = useTransition();
  const [category, setCategory] = useQueryState(
    t.category,
    parseAsInteger
      .withDefault(-1)
      .withOptions({ shallow: false, clearOnDefault: true, startTransition }),
  );

  function valueCallback(category: string | null) {
    const categoryToSet = categories.findIndex((c) => c.label === category);
    setCategory(categoryToSet !== -1 ? categoryToSet + 1 : -1);
  }

  if (isLoading) return <Skeleton className='w-full lg:w-[250px]' />;

  return (
    <Combobox
      choices={categories}
      defaultDescription={t.defaultDescription}
      defaultPlaceholder={t.defaultPlaceholder}
      buttonClassName='w-full lg:w-[250px]'
      contentClassName='w-full lg:w-[200px]'
      valueCallback={valueCallback}
      initialValue={categories[category - 1]?.value}
      ariaLabel={t.defaultDescription}
    />
  );
}

export { CategorySelector };
