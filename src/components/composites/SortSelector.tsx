'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Skeleton } from '@/components/ui/Skeleton';
import { parseAsString, useQueryState } from 'nuqs';
import { useTransition } from 'react';

type SortSelectorProps = {
  filters: {
    name: string;
    urlName: string;
  }[];
  t: {
    sort: string;
    defaultValue: string;
    defaultSorting: string;
    ariaLabel: string;
  };
};

function SortSelector({ filters, t }: SortSelectorProps) {
  const [isLoading, startTransition] = useTransition();
  const [filter, setFilter] = useQueryState(
    t.sort,
    parseAsString
      .withDefault(t.defaultSorting)
      .withOptions({ shallow: false, clearOnDefault: true, startTransition }),
  );

  function handleChange(value: string) {
    const filterUrlName = filters.find((f) => f.name === value)?.urlName;
    if (filterUrlName) {
      setFilter(filterUrlName);
    }
  }

  if (isLoading) return <Skeleton className='w-full lg:w-[250px]' />;

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={
        filters.find((f) => f.urlName === filter)?.name ?? t.defaultValue
      }
    >
      <SelectTrigger className='w-full lg:w-[250px]' aria-label={t.ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {filters.map((filter) => (
          <SelectItem key={filter.name} value={filter.name}>
            {filter.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export { SortSelector };
