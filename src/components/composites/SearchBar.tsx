import { Input } from '@/components/ui/Input';
import { cx } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import type * as React from 'react';

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBar = ({
  ref,
  className,
  ...props
}: SearchBarProps & {
  ref: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className={cx('relative flex items-center', className)}>
      <SearchIcon className='absolute left-2 h-4 w-4 text-muted-foreground' />
      <Input className='pl-8' ref={ref} {...props} />
    </div>
  );
};
SearchBar.displayName = 'SearchBar';

export { SearchBar };
