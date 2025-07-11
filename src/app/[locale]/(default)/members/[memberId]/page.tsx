import { MemberViewCard } from '@/components/members/MemberViewCard';
import { SkillCard } from '@/components/members/SkillCard';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api/server';
import { Link } from '@/lib/locale/navigation';
import { memberMockData } from '@/mock-data/member';
import { ArrowLeftIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { member: string };
}) {
  const member = memberMockData.find(
    (member) => member.id === Number(params.member),
  );

  return {
    title: member?.name,
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

  return (
    <>
      <div className='relative'>
        <h2 className='mx-auto text-center text-3xl sm:text-4xl'>
          {user.firstName} {user.lastName}
        </h2>
        <Button asChild variant='ghost'>
          <Link
            className='-translate-y-1/2 absolute top-1/2 left-0 flex gap-2'
            href='/members'
            aria-label={t('backToMember')}
          >
            <ArrowLeftIcon aria-hidden='true' />
            <span className='hidden sm:inline'>{t('backToMember')}</span>
          </Link>
        </Button>
      </div>

      <div className='my-10 flex flex-col items-center justify-center gap-6 lg:flex-row'>
        <MemberViewCard user={user} />
        <SkillCard skills={user.usersSkills.map((row) => row.skill)} />
      </div>
    </>
  );
}
