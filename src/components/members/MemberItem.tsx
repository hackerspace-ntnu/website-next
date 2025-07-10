import { InternalBadge } from '@/components/members/InternalBadge';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import Image from 'next/image';

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
    <Link
      className={cx('group block whitespace-normal font-normal', className)}
      href={{
        pathname: '/members/[memberId]',
        params: { memberId: id },
      }}
      variant='none'
      size='none'
    >
      <div className='relative flex flex-col gap-4 overflow-hidden rounded-lg bg-card px-10 py-6 transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
        {internal && (
          <InternalBadge className='absolute top-2 right-2 h-5 w-5' />
        )}
        <div className='relative h-44 w-44'>
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
  );
}

export { MemberItem };
