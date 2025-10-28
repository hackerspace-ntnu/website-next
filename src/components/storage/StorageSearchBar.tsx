'use client';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { SearchBar } from '@/components/composites/SearchBar';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';

type StorageSearchBarProps = {
  placeholder: string;
  t: {
    name: string;
    page: string;
  };
};

function StorageSearchBar({ placeholder, t }: StorageSearchBarProps) {
  const [search, setSearch] = useQueryState(
    t.name,
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false, clearOnDefault: true }),
  );
  const [, setPage] = useQueryState(
    t.page,
    parseAsInteger
      .withDefault(1)
      .withOptions({ shallow: false, clearOnDefault: true }),
  );

  function handleChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  const debouncedHandleChange = useDebounceCallback(handleChange, 500);

  return (
    <SearchBar
      className='lg:max-w-2xl'
      placeholder={placeholder}
      defaultValue={search}
      onChange={(e) => debouncedHandleChange(e.target.value)}
    />
  );
}
export { StorageSearchBar };
