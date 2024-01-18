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
      <Logo className='h-5 w-5 md:h-11 md:w-11' />
      <span className='text-md font-montserrat font-bold md:text-2xl'>
        HACKERSPACE
      </span>
    </Link>
  );
}

export { LogoLink };
