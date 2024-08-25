import { useTranslations } from 'next-intl';

import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

import { Logo } from '@/components/assets/Logo';
import { Button } from '@/components/ui/Button';

function LogoLink({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const t = useTranslations('layout');
  return (
    <Button
      className={cx('flex items-center space-x-2', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link href='/' aria-label={t('hackerspaceHome')} onClick={onClick}>
        <Logo className='h-6 w-6 md:h-8 md:w-8 xl:h-10 xl:w-10' />
        <span className='font-bold font-montserrat text-md md:text-lg xl:text-2xl'>
          HACKERSPACE
        </span>
      </Link>
    </Button>
  );
}

export { LogoLink };
