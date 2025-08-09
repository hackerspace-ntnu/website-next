import { HackerspaceLogo } from '@/components/assets/logos';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';

type LogoLinkProps = {
  className?: string;
  logoClassName?: string;
  titleClassName?: string;
  logoOnly?: boolean;
  onClick?: () => void;
  t: {
    hackerspaceHome: string;
  };
};

function LogoLink({
  className,
  logoClassName,
  titleClassName,
  logoOnly = false,
  onClick,
  t,
}: LogoLinkProps) {
  return (
    <Link
      className={cx('flex items-center space-x-2', className)}
      href='/'
      aria-label={t.hackerspaceHome}
      title={t.hackerspaceHome}
      onClick={onClick}
    >
      <HackerspaceLogo
        className={cx(
          'clamp-[h-7-11-clamp] clamp-[w-7-11-clamp]',
          logoClassName,
        )}
      />
      {!logoOnly && (
        <span
          className={cx(
            'clamp-[text-lg-2xl-clamp] font-bold font-montserrat',
            titleClassName,
          )}
        >
          HACKERSPACE
        </span>
      )}
    </Link>
  );
}

export { LogoLink };
