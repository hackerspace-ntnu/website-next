import { SearchIcon } from 'lucide-react';
import { Input, type InputProps } from '@/components/ui/Input';
import { cx } from '@/lib/utils';

function SearchBar({
  ref,
  className,
  ...props
}: InputProps & {
  ref?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className={cx('relative flex items-center', className)}>
      <SearchIcon className='absolute left-2 h-4 w-4 text-muted-foreground' />
      <Input className='pl-8' ref={ref} {...props} />
    </div>
  );
}

export { SearchBar };
