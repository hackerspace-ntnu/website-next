import { Meteors } from '@/components/ui/Meteor';
import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import Image from 'next/image';

import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

type GroupCardProps = {
  className?: string;
  id: number;
  name: string;
  photoUrl: string;
  description: string;
};

function GroupCard({
  className,
  id,
  name,
  photoUrl,
  description,
}: GroupCardProps) {
  return (
    <Button
      className={cx('group block whitespace-normal font-normal', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link
        href={{
          pathname: '/about/[group]',
          params: { group: name },
        }}
      >
        <div className='relative flex h-96 w-96 flex-col gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
          <div className='absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
            <Meteors
              number={15}
              className={'absolute inset-0 z-10'}
              hoverDelay='0.5s'
            />
          </div>

          <div className='relative z-10 h-44 w-44 self-center'>
            <Image
              className='rounded-full object-cover object-center'
              src={`/${photoUrl}`}
              alt={name}
              fill
            />
          </div>

          <div className='relative z-10 py-2 pr-1'>
            <h3 className='line-clamp-2 text-lg transition-colors group-hover:text-primary'>
              {name}
            </h3>
            <p className='line-clamp-2 text-xs sm:text-sm [&:not(:first-child)]:mt-2'>
              {description}
            </p>
          </div>
        </div>
      </Link>
    </Button>
  );
}

export { GroupCard, type GroupCardProps };
