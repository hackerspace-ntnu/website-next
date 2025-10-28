'use client';

import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { SearchBar } from '@/components/composites/SearchBar';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';
import { cx } from '@/lib/utils';

function MembersSearchBar({
  placeholder,
  t,
  className,
}: {
  placeholder: string;
  t: {
    name: string;
    page: string;
  };
  className?: string;
}) {
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
      className={cx('lg:max-w-2xl', className)}
      placeholder={placeholder}
      defaultValue={search}
      onChange={(e) => debouncedHandleChange(e.target.value)}
    />
  );
}

export { MembersSearchBar };
