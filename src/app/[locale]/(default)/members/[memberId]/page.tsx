import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { GroupManagementTable } from '@/components/members/GroupManagementTable';
import { MemberInfoCard } from '@/components/members/MemberInfoCard';
import { SkillCard } from '@/components/members/SkillCard';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ memberId: string }>;
}) {
  const { memberId } = await params;

  const processedMemberId = Number(memberId);
  if (
    !memberId ||
    Number.isNaN(processedMemberId) ||
    !Number.isInteger(processedMemberId)
  )
    return;

  const user = await api.users.fetchUser({
    id: processedMemberId,
  });

  if (!user) return;

  return {
    title: `${user.firstName} ${user.lastName}`,
  };
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ locale: Locale; memberId: string }>;
}) {
  const { locale, memberId } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('members');

  const processedMemberId = Number(memberId);

  if (Number.isNaN(processedMemberId) || !Number.isInteger(processedMemberId))
    return notFound();

  const user = await api.users.fetchUser({
    id: processedMemberId,
  });

  if (!user) return notFound();

  const auth = await api.auth.state();
  const groups = await api.groups.fetchGroups();
  const skills = await api.skills.fetchAllSkills();
  const canEdit = auth.user?.groups.some((g) =>
    ['admin', 'management'].includes(g),
  );
  const { about, members, ui } = await getMessages();

  // We do not allow editing skills if you're not a member yourself
  const userSkills =
    auth?.user && auth.user.groups.length > 0
      ? await api.skills.fetchUserSkills({
          userId: auth.user.id,
        })
      : [];

  return (
    <>
      <div className='relative'>
        <h2 className='mx-auto text-center text-3xl sm:text-4xl'>
          {user.firstName} {user.lastName}
        </h2>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex gap-2'
          href='/members'
          aria-label={t('backToMember')}
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon aria-hidden='true' />
          <span className='hidden sm:inline'>{t('backToMember')}</span>
        </Link>
      </div>
      <div className='my-10 flex flex-col items-center justify-center gap-6 lg:flex-row'>
        <MemberInfoCard user={user} />
        <SkillCard
          user={user}
          allSkills={skills}
          editableSkills={userSkills.map(
            (userSkill) => userSkill.skill.identifier,
          )}
          isManagement={!!canEdit}
        />
      </div>
      {canEdit && (
        <>
          <Separator />
          <h3 className='my-4 text-center'>{t('groupManagement.title')}</h3>
          <NextIntlClientProvider
            messages={
              { about, members, ui } as Pick<
                Messages,
                'about' | 'members' | 'ui'
              >
            }
          >
            <GroupManagementTable user={user} groups={groups} />
          </NextIntlClientProvider>
        </>
      )}
    </>
  );
}
