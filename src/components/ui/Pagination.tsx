import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { type ButtonProps, buttonVariants } from '@/components/ui/Button';
import { cx } from '@/lib/utils';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label='pagination'
      className={cx('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul
      className={cx('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({
  className,
  ...props
}: React.ComponentPropsWithRef<'li'>) {
  return <li className={cx('', className)} {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cx(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  goToPreviousPage,
  previous,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  goToPreviousPage: string;
  previous: string;
}) {
  return (
    <PaginationLink
      aria-label={goToPreviousPage}
      size='default'
      className={cx('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeftIcon className='h-4 w-4' />
      <span>{previous}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  goToNextPage,
  next,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  goToNextPage: string;
  next: string;
}) {
  return (
    <PaginationLink
      aria-label={goToNextPage}
      size='default'
      className={cx('gap-1 pr-2.5', className)}
      {...props}
    >
      <span>{next}</span>
      <ChevronRightIcon className='h-4 w-4' />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  morePages,
  ...props
}: React.ComponentProps<'span'> & {
  morePages: string;
}) {
  return (
    <span
      aria-hidden
      className={cx('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className='h-4 w-4' />
      <span className='sr-only'>{morePages}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
