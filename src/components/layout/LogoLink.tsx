import { Logo } from '@/components/assets/Logo';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
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
    <Button
      className={cx('flex items-center space-x-2', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link href='/' aria-label={t.hackerspaceHome} onClick={onClick}>
        <Logo className='size-6 md:size-8 lg:size-10' />
        <span className='font-bold font-montserrat text-md md:text-lg lg:text-2xl'>
          HACKERSPACE
        </span>
      </Link>
    </Button>
  );
}

export { LogoLink };
