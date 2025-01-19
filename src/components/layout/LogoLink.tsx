import { Logo } from '@/components/assets/Logo';
import { Link } from '@/components/composites/Link';
import { cx } from '@/lib/utils';

type LogoLinkProps = {
  className?: string;
  onClick?: () => void;
  t: {
    hackerspaceHome: string;
  };
};

function LogoLink({ className, onClick, t }: LogoLinkProps) {
  return (
    <Link
      className={cx('flex items-center space-x-2', className)}
      variant='none'
      size='none'
      href='/'
      aria-label={t.hackerspaceHome}
      onClick={onClick}
    >
      <Logo className='size-6 md:size-8 lg:size-10' />
      <span className='font-bold font-montserrat text-md md:text-lg lg:text-2xl'>
        HACKERSPACE
      </span>
    </Link>
  );
}

export { LogoLink };
