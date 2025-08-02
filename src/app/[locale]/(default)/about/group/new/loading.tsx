import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { EditGroupFormSkeleton } from '@/components/groups/EditGroupFormSkeleton';
import { Link } from '@/components/ui/Link';

export default async function NewGroupLoading() {
  const t = await getTranslations('groups');

  return (
    <main>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href='/about'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToAbout')}</span>
        </Link>
        <h1>{t('new.title')}</h1>
      </div>
      <div className='mx-auto lg:max-w-2xl'>
        <EditGroupFormSkeleton />
      </div>
    </main>
  );
}
