'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { SearchBar } from '@/components/composites/SearchBar';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';

type StorageSearchBarProps = {
  placeholder: string;
  t: {
    name: string;
  };
};

function StorageSearchBar({ placeholder, t }: StorageSearchBarProps) {
  const [search, setSearch] = useQueryState(
    t.name,
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false, clearOnDefault: true }),
  );

  const debouncedSetSearch = useDebounceCallback(setSearch, 500);

  return (
    <SearchBar
      className='lg:max-w-2xl'
      placeholder={placeholder}
      defaultValue={search}
      onChange={(e) => debouncedSetSearch(e.target.value)}
    />
  );
}
export { StorageSearchBar };
