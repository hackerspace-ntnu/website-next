import Image from 'next/image';

import { Link } from '@/lib/navigation';
import { cx } from '@/lib/utils';

import { InternalBadge } from '@/components/news/InternalBadge';
import { Button } from '@/components/ui/Button';

type MemberItemProps = {
  className?: string;
  id: number;
  internal: boolean;
  name: string;
  group: string;
  photoUrl: string;
};

function MemberItem({
  className,
  id,
  internal,
  name,
  group,
  photoUrl,
}: MemberItemProps) {
  return (
    <Button
      className={cx('group block whitespace-normal font-normal', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link
        href={{
          pathname: '/members/[member]',
          params: { member: id },
        }}
      >
        <div className='flex h-72 w-64 flex-col gap-4 overflow-hidden rounded-lg bg-card p-3 transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
          <div className='relative h-44 w-44 self-center'>
            <InternalBadge className='h-5 w-5' internal={internal} />
            <Image
              className='rounded-full object-cover object-center'
              src={`/${photoUrl}`}
              alt={name}
              fill
            />
          </div>
          <div className='py-2 pr-1'>
            <h3 className='line-clamp-2 text-lg transition-colors group-hover:text-primary'>
              {name}
            </h3>
            <p className='line-clamp-2 text-xs sm:text-sm [&:not(:first-child)]:mt-2'>
              {group}
            </p>
          </div>
        </div>
      </Link>
    </Button>
  );
}

export { MemberItem };
