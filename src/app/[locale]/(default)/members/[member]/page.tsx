import { memberMockData as memberData } from '@/mock-data/member';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

//import { useRouter } from 'next/navigation';
import { MemberViewCard } from '@/components/members/MemberViewCard';

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
  unstable_setRequestLocale(params.locale);
  //const t = useTranslations('members');

  const member = memberData.find(
    (member) => member.id === Number(params.member),
  );
  if (!member) {
    return notFound();
  }

  return (
    <>
      <h2 className='my-4 py-4'>{member.name}</h2>
      <div className='h-screen mt-10'>
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
      </div>
    </>
    /* <article>
      <header>
        <div className='mb-10 mt-5 flex justify-center grid-cols-2 bg-red-500'>
          <Image
            className='h-auto w-full max-w-4xl rounded-lg'
            src={`/${member.photoUrl}`}
            alt={member.name}
            width={1600}
            height={900}
            priority
          />
        </div>
        <h2 className='my-4'>{member.name}</h2>
      </header>
      <section className='mb-6 space-y-4'>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col'>
            <small className='text-foreground/60'>
              {member.group}
            </small>
          </div>
        </div>
      </section>
      <section className='my-6'>{member.name}</section>
    </article> */
  );
}
