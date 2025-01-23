import { HackerspaceLogo } from '@/components/assets/logos';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

type LogoLinkProps = {
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
  onClick?: () => void;
  t: {
    hackerspaceHome: string;
  };
};

function LogoLink({
  className,
  logoClassName,
  titleClassName,
  onClick,
  t,
}: LogoLinkProps) {
  return (
    <Button
      className={cx('flex items-center space-x-2', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link
        href='/'
        aria-label={t.hackerspaceHome}
        title={t.hackerspaceHome}
        onClick={onClick}
      >
        <HackerspaceLogo className={cx('~w-7/11 ~h-7/11', logoClassName)} />
        <span
          className={cx(
            '~text-lg/2xl font-bold font-montserrat',
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
