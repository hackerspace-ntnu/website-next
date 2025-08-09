import { UserCircle2Icon } from 'lucide-react';
import Image from 'next/image';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';
import { InternalBadge } from '@/components/members/InternalBadge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

type MemberItemCardProps = {
  user: RouterOutput['users']['fetchUsers'][number];
  className?: string;
};

async function MemberCard({ user, className }: MemberItemCardProps) {
  const t = await getTranslations('members');
  const locale = await getLocale();
  const format = await getFormatter();
  const profilePictureUrl = user.profilePictureId
    ? await api.utils.getFileUrl({
        fileId: user.profilePictureId,
      })
    : null;

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
        <CardContent>
          {user.private && (
            <InternalBadge className='absolute top-2 right-2 h-5 w-5' />
          )}
          <div className='mx-auto h-48 w-48'>
            {profilePictureUrl ? (
              <Image
                className='rounded-full object-cover object-center'
                src={profilePictureUrl}
                alt={`${user.firstName} ${user.lastName}`}
                fill
              />
            ) : (
              <UserCircle2Icon className='h-full w-full object-cover' />
            )}
          </div>
        </CardContent>
        <CardFooter>
          {user.memberSince && (
            <span className='text-muted-foreground text-sm'>
              {t('memberSince', {
                date: format.dateTime(user.memberSince, {
                  dateStyle: 'short',
                }),
              })}
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

export { MemberCard };
