import { getLocale, getTranslations } from 'next-intl/server';
import { MemberAvatar } from '@/components/members/MemberAvatar';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Link } from '@/components/ui/Link';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import type { RouterOutput } from '@/server/api';

async function UserSearchTable({
  users,
}: {
  users: RouterOutput['users']['fetchUsers'];
}) {
  const locale = await getLocale();
  const t = await getTranslations('management.users.table');

  return (
    <Table>
      <TableCaption>{t('caption')}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>{t('name')}</TableHead>
          <TableHead>{t('groups')}</TableHead>
          <TableHead className='hidden md:table-cell'>{t('skills')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const groupNames = user.usersGroups
            .map(
              (userGroup) =>
                userGroup.group.localizations.find(
                  (loc) => loc.locale === locale,
                )?.name,
            )
            .filter((name) => !!name)
            .join(', ');
          return (
            <TableRow key={user.id}>
              <TableCell>
                <Link
                  href={{
                    pathname: '/members/[memberId]',
                    params: { memberId: user.id },
                  }}
                  className='flex items-center gap-4 hover:[&>span]:underline'
                >
                  <MemberAvatar
                    user={user}
                    profilePictureUrl={user.profilePictureUrl ?? undefined}
                    size='md'
                    className='shrink-0'
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </Link>
              </TableCell>
              <TableCell>
                {groupNames.length > 50
                  ? `${groupNames.substring(0, 50)}...`
                  : groupNames}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <div className='grid w-fit grid-cols-3 gap-0.5'>
                  {user.usersSkills.map((userSkill) => (
                    <SkillIcon
                      key={`${userSkill.userId}-${userSkill.skillId}`}
                      skill={userSkill.skill}
                      size='medium'
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className='text-center'>
              {t('noUsersFound')}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export { UserSearchTable };
