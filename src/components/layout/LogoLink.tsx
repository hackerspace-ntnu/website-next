import { useTranslations } from 'next-intl';

import { Link } from '@/lib/navigation';

import { Logo } from '@/components/assets/Logo';

function LogoLink() {
  const t = useTranslations('layout');
  return (
    <Link
      className='flex items-center space-x-2'
      href='/'
      aria-label={t('home')}
    >
      <Logo className='h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10' />
      <span className='text-md font-montserrat font-bold md:text-lg lg:text-2xl'>
        HACKERSPACE
      </span>
    </Link>
  );
}

export { LogoLink };
