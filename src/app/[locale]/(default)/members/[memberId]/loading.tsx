import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { MemberInfoCardSkeleton } from '@/components/members/MemberInfoCardSkeleton';
import { SkillCardSkeleton } from '@/components/members/SkillCardSkeleton';
import { Link } from '@/components/ui/Link';
import { Skeleton } from '@/components/ui/Skeleton';

export default async function MemberLoading() {
  const t = await getTranslations('members');

  return (
    <>
      <div className='relative'>
        <Skeleton className='mx-auto h-10 w-64' />
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
        <MemberInfoCardSkeleton />
        <SkillCardSkeleton />
      </div>
    </>
  );
}
