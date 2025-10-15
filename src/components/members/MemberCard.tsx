import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { InternalBadge } from '@/components/members/InternalBadge';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

type MemberItemCardProps = {
  user: RouterOutput['users']['fetchMembers'][number];
  className?: string;
};

async function MemberCard({ user, className }: MemberItemCardProps) {
  const t = await getTranslations('members');
  const locale = await getLocale();
  const format = await getFormatter();

  return (
    <Link
      className={cx('h-full w-full', className)}
      href={{
        pathname: '/members/[memberId]',
        params: { memberId: user.id },
      }}
      variant='none'
      size='none'
    >
      <Card className='relative h-full w-full px-2'>
        <CardHeader>
          <CardTitle>
            {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription>
            {user.usersGroups
              .map(
                (row) =>
                  row.group.localizations.find(
                    (localization) => localization.locale === locale,
                  )?.name,
              )
              .filter((item) => item !== undefined)
              .join(', ')}
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center'>
          {user.private && (
            <InternalBadge className='absolute top-2 right-2 h-5 w-5' />
          )}
          <MemberAvatar
            size='xl'
            user={user}
            profilePictureUrl={user.profilePictureUrl ?? undefined}
          />
          {user.memberSince && (
            <span className='pt-4 text-muted-foreground text-sm'>
              {t('memberSince', {
                date: format.dateTime(user.memberSince, {
                  dateStyle: 'short',
                }),
              })}
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export { MemberCard };
