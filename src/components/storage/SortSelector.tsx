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
  };
  searchParams: Record<string, string | string[] | undefined>;
};

function SortSelector({ filters, t, searchParams }: SortSelectorProps) {
  const [filter, setFilter] = useQueryState(
    t.sort,
    parseAsString.withDefault(searchParams.sort?.toString() ?? ''),
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
      <SelectTrigger className='w-full lg:w-[250px]'>
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
