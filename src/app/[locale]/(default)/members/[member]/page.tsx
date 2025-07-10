import { MemberViewCard } from '@/components/members/MemberViewCard';
import { SkillCard } from '@/components/members/SkillCard';
import { Button } from '@/components/ui/Button';
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
  params: Promise<{ locale: Locale; member: string }>;
}) {
  const { locale, member } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('members');

  const memberData = memberMockData.find(
    (mockMember) => mockMember.id === Number(member),
  );
  if (!memberData) {
    return notFound();
  }

  return (
    <>
      <div className='relative'>
        <h2 className='mx-auto mt-96 text-center text-3xl sm:text-4xl'>
          {memberData.name}
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

      <div className='my-10 flex flex-col items-center space-y-5'>
        <MemberViewCard
          key={memberData.id}
          id={memberData.id}
          internal={memberData.internal}
          name={memberData.name}
          group={memberData.group}
          photoUrl={memberData.photoUrl}
          bio={memberData.bio}
          mail={memberData.mail}
          instagram={memberData.instagram}
          discord={memberData.discord}
          github={memberData.github}
          linkedin={memberData.linkedin}
        />
        <SkillCard
          key={memberData.id}
          id={memberData.id}
          internal={memberData.internal}
          name={memberData.name}
          group={memberData.group}
          photoUrl={memberData.photoUrl}
          bio={memberData.bio}
          mail={memberData.mail}
          instagram={memberData.instagram}
          discord={memberData.discord}
          github={memberData.github}
          linkedin={memberData.linkedin}
        />
      </div>
    </>
  );
}
