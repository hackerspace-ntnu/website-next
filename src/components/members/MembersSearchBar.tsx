'use client';

import { parseAsString, useQueryState } from 'nuqs';
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
  };
  className?: string;
}) {
  const [search, setSearch] = useQueryState(
    t.name,
    parseAsString
      .withDefault('')
      .withOptions({ shallow: false, clearOnDefault: true }),
  );

  const debouncedSetSearch = useDebounceCallback(setSearch, 500);

  return (
    <SearchBar
      className={cx('lg:max-w-2xl', className)}
      placeholder={placeholder}
      defaultValue={search}
      onChange={(e) => debouncedSetSearch(e.target.value)}
    />
  );
}

export { MembersSearchBar };
