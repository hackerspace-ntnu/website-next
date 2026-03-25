import { UsersRoundIcon } from 'lucide-react';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { InternalBadge } from '@/components/about/InternalBadge';
import { Meteors } from '@/components/fancy/Meteors';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

type GroupCardProps = {
  group: RouterOutput['groups']['fetchGroups'][number];
  className?: string;
};

async function GroupCard({ className, group }: GroupCardProps) {
  const locale = await getLocale();
  const groupLocalization =
    group.localizations.find(
      (localization) => localization.locale === locale,
    ) ??
    group?.localizations.find(
      (localization) => localization.locale === 'en-GB',
    );

  if (!groupLocalization) {
    return null;
  }

  const isDPRD = group.identifier === 'devops';

  return (
    <Link
      href={{
        pathname: '/about/group/[name]',
        params: { name: group.identifier },
      }}
      className={cx(
        'group block w-fit whitespace-normal font-normal',
        className,
        isDPRD && 'rotate-0',
      )}
      variant='none'
      size='none'
    >
      <div className='clamp-[h-80-96-clamp] clamp-[w-80-96-clamp] relative flex flex-col gap-1 overflow-hidden rounded-lg bg-accent/70 px-10 py-7 transition-colors group-hover:bg-accent dark:bg-card group-hover:dark:bg-card'>
        {group.internal && <InternalBadge className='top-2 right-2' />}
        <div className='absolute inset-0 z-0 animate-meteors opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
          <Meteors
            number={isDPRD ? 150 : 15}
            className='absolute inset-0 z-10'
          />
        </div>
        <div
          className={cx(
            'relative z-10 h-32 w-32 self-center',
            isDPRD && 'h-48 w-full',
          )}
        >
          {isDPRD ? (
            <Image
              className='rounded-lg object-cover object-center'
              src='/devopsFlag.webp'
              alt="The Democratic People's Republic of DevOps' flag"
              fill
            />
          ) : group.imageUrl ? (
            <div className='relative mx-auto h-auto w-64 max-w-2xl overflow-hidden rounded-lg md:w-96'>
              <Image
                className='rounded-lg object-cover object-center'
                src={group.imageUrl}
                alt={`${groupLocalization.name} logo`}
                fill
              />
            </div>
          ) : (
            <UsersRoundIcon className='h-full w-full' />
          )}
        </div>
        <div className='relative z-10 py-2 pr-1'>
          <h3
            className={cx(
              'line-clamp-2 text-lg transition-colors group-hover:text-primary',
              isDPRD && 'rotate-0',
            )}
          >
            {isDPRD
              ? "The Democratic People's Republic of DevOps"
              : groupLocalization.name}
          </h3>
          <p className='line-clamp-2 text-sm [&:not(:first-child)]:mt-2'>
            {groupLocalization.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

export { GroupCard, type GroupCardProps };
