import { cx } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import * as React from 'react';

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * This component creates a full search bar with an icon.
 * The ref, if used, is passed onto the input element, not the wrapper for the component.
 */
const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        className={cx(
          'flex h-10 w-full gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
          className,
        )}
      >
        <SearchIcon />
        <input
          type={type}
          className={cx(
            'w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
SearchBar.displayName = 'SearchBar';

export { SearchBar };
