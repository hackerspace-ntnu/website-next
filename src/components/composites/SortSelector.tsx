'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { parseAsString, useQueryState } from 'nuqs';

type SortSelectorProps = {
  filters: {
    name: string;
    urlName: string;
  }[];
  t: {
    sort: string;
    defaultPlaceholder: string;
    defaultSorting: string;
    ariaLabel: string;
  };
};

function SortSelector({ filters, t }: SortSelectorProps) {
  const [filter, setFilter] = useQueryState(
    t.sort,
    parseAsString
      .withDefault(t.defaultSorting)
      .withOptions({ shallow: false, clearOnDefault: true }),
  );

  return (
    <Select
      onValueChange={(value) => {
        const filterUrlName = filters.find((f) => f.name === value)?.urlName;
        if (filterUrlName) {
          setFilter(filterUrlName);
        }
      }}
      defaultValue={
        filters.find((f) => f.urlName === filter)?.name ?? undefined
      }
    >
      <SelectTrigger className='w-full lg:w-[250px]' aria-label={t.ariaLabel}>
        <SelectValue placeholder={t.defaultPlaceholder} />
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
