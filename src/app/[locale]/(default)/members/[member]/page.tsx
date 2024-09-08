import { memberMockData as memberData } from '@/mock-data/member';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

//import { useRouter } from 'next/navigation';

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
    <div>hei</div>
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
