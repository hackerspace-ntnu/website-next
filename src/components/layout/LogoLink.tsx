import { Logo } from '@/components/assets/Logo';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import { useTranslations } from 'next-intl';

function LogoLink({
  className,
  logoClassName,
  titleClassName,
  onClick,
}: {
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
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
        <Logo className={cx('size-6 md:size-8 lg:size-10', logoClassName)} />
        <span
          className={cx(
            'font-bold font-montserrat text-md md:text-lg lg:text-2xl',
            titleClassName,
          )}
        >
          HACKERSPACE
        </span>
      </Link>
    </Button>
  );
}

export { LogoLink };
