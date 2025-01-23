import { MatrixLogo } from '@/components/assets/logos';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type MatrixButtonProps = {
  className?: string;
  t: {
    title: string;
  };
};

function MatrixButton({ className, t }: MatrixButtonProps) {
  return (
    <Button variant='ghost' size='icon' className={className} asChild>
      <Link
        href='https://app.element.io/#/login'
        title={t.title}
        aria-label={t.title}
      >
        <MatrixLogo className='h-[1.2rem] w-[1.2rem]' />
      </Link>
    </Button>
  );
}

export { MatrixButton };
