import { Main } from '@/components/layout/Main';
import { Link } from '@/components/ui/Link';
import { AlertTriangleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TooManyRequestsPage() {
  const t = useTranslations('error');
  return (
    <Main className='flex min-h-svh flex-col items-center justify-center'>
      <AlertTriangleIcon className='mb-6 xs:mb-8 h-16 xs:h-24 w-16 xs:w-24 text-primary' />
      <h1 className='mb-3 xs:mb-4'>{t('tooManyRequests')}</h1>
      <p className='mb-6 xs:mb-8 text-lg text-muted-foreground xs:text-xl'>
        {t('tooManyRequestsDescription')}
      </p>
      <Link
        className='w-full xs:w-auto'
        variant='default'
        size='default'
        href='/'
      >
        {t('goToHomepage')}
      </Link>
    </Main>
  );
}
