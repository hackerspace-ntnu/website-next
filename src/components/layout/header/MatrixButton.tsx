import { Button } from '@/components/ui/Button';
import { MessageSquareMoreIcon } from 'lucide-react';
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
      <Link href='/' title={t.title} aria-label={t.title}>
        <MessageSquareMoreIcon
          className='h-[1.2rem] w-[1.2rem]'
          aria-hidden='true'
        />
      </Link>
    </Button>
  );
}

export { MatrixButton };
