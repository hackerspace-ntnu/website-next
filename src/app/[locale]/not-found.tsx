import { Link } from '@/components/composites/Link';
import { HardDriveIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('error');
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4'>
      <HardDriveIcon className='mb-6 xs:mb-8 size-16 xs:size-24 text-primary' />
      <h1 className='mb-3 xs:mb-4 font-bold text-3xl xs:text-4xl'>
        {t('notFound')}
      </h1>
      <p className='mb-6 xs:mb-8 text-lg text-muted-foreground xs:text-xl'>
        {t('notFoundDescription')}
      </p>
      <Link
        className='w-full xs:w-auto'
        variant='primary'
        size='button'
        href='/'
      >
        {t('goToHomepage')}
      </Link>
    </div>
  );
}
