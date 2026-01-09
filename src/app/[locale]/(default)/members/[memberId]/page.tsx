import { TRPCError } from '@trpc/server';
import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import {
  createSearchParamsCache,
  parseAsBoolean,
  type SearchParams,
} from 'nuqs/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { GroupManagementTable } from '@/components/members/GroupManagementTable';
import { MemberInfoCard } from '@/components/members/MemberInfoCard';
import { SkillCard } from '@/components/members/SkillCard';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

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

  let user: RouterOutput['users']['fetchMember'] | null = null;
  try {
    user = await api.users.fetchMember({
      id: processedMemberId,
    });
  } catch {
    return;
  }

  if (!user) return;

  return {
    title: `${user.firstName} ${user.lastName}`,
  };
}

export default async function MemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; memberId: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale, memberId } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('members');
  const tManagement = await getTranslations('management');

  const processedMemberId = Number(memberId);

  if (Number.isNaN(processedMemberId) || !Number.isInteger(processedMemberId)) {
    return notFound();
  }

  let user: RouterOutput['users']['fetchMember'] | null = null;
  try {
    user = await api.users.fetchMember({
      id: processedMemberId,
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === 'FORBIDDEN') {
        return <ErrorPageContent message={t('unauthorized')} />;
      }
      console.error(error);
    }
  }

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

  const searchParamsCache = createSearchParamsCache({
    management: parseAsBoolean.withDefault(false),
  });

  const { management } = searchParamsCache.parse(await searchParams);

  return (
    <>
      <div className='relative'>
        <h2 className='mx-auto text-center text-3xl sm:text-4xl'>
          {user.firstName} {user.lastName}
        </h2>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex gap-2'
          href={management ? '/management/users' : '/members'}
          aria-label={
            management ? tManagement('backToManagement') : t('backToMember')
          }
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon aria-hidden='true' />
          <span className='hidden sm:inline'>
            {management ? tManagement('backToManagement') : t('backToMember')}
          </span>
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
            <GroupManagementTable
              user={user}
              groups={groups}
              isOwnProfile={auth.user?.id === user.id}
            />
          </NextIntlClientProvider>
        </>
      )}
    </>
  );
}
