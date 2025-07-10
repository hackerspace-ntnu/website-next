import { Meteors } from '@/components/fancy/Meteors';
import { cx } from '@/lib/utils';
import Image from 'next/image';
import type { RouterOutput } from '@/server/api';
import { getLocale } from 'next-intl/server';
import { UsersRoundIcon } from 'lucide-react';
import { Link } from '@/components/ui/Link';

type GroupCardProps = {
  group: RouterOutput['about']['fetchGroups'][number];
  className?: string;
};

async function GroupCard({ className, group }: GroupCardProps) {
  const locale = await getLocale();
  const groupLocalization = group.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!groupLocalization) {
    return null;
  }

  return (
    <Link
      href={`about/group/${group.id}`}
      className={cx(
        'group block whitespace-normal font-normal w-fit',
        className,
      )}
      variant='none'
      size='none'
    >
      <div className='relative flex h-96 w-96 flex-col gap-1 overflow-hidden rounded-lg bg-card px-10 py-7 transition-colors group-hover:bg-accent group-hover:dark:bg-card'>
        <div className='absolute inset-0 z-0 animate-meteors opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
          <Meteors number={15} className={'absolute inset-0 z-10'} />
        </div>
        <div className='relative z-10 h-32 w-32 self-center'>
          {group.imageUrl ? (
            <Image
              className='rounded-full object-cover object-center'
              src={group.imageUrl}
              alt={`${groupLocalization.name} logo`}
              fill
            />
          ) : (
            <UsersRoundIcon className='h-full w-full' />
          )}
        </div>
        <div className='relative z-10 py-2 pr-1'>
          <h3 className='line-clamp-2 text-lg transition-colors group-hover:text-primary'>
            {groupLocalization.name}
          </h3>
          <p className='line-clamp-2 text-xs sm:text-sm [&:not(:first-child)]:mt-2'>
            {groupLocalization.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

export { GroupCard, type GroupCardProps };
