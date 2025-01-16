import { MemberViewCard } from '@/components/members/MemberViewCard';
import { SkillCard } from '@/components/members/SkillCard';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { memberMockData as memberData } from '@/mock-data/member';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { member: string };
}) {
  const member = memberData.find(
    (member) => member.id === Number(params.member),
  );

  return {
    title: member?.name,
  };
}

export default function memberPage({
  params,
}: {
  params: { locale: string; member: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations('members');

  const member = memberData.find(
    (member) => member.id === Number(params.member),
  );
  if (!member) {
    return notFound();
  }

  return (
    <>
      <div className='relative'>
        <h2 className='mx-auto mt-96 text-center text-3xl sm:text-4xl'>
          {member.name}
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
          key={member.id}
          id={member.id}
          internal={member.internal}
          name={member.name}
          group={member.group}
          photoUrl={member.photoUrl}
          bio={member.bio}
          mail={member.mail}
          instagram={member.instagram}
          discord={member.discord}
          github={member.github}
          linkedin={member.linkedin}
        />
        <SkillCard
          key={member.id}
          id={member.id}
          internal={member.internal}
          name={member.name}
          group={member.group}
          photoUrl={member.photoUrl}
          bio={member.bio}
          mail={member.mail}
          instagram={member.instagram}
          discord={member.discord}
          github={member.github}
          linkedin={member.linkedin}
        />
      </div>
    </>
  );
}
