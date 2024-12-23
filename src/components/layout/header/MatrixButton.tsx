import { Button } from '@/components/ui/Button';
import { MessageSquareMoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type MatrixButtonProps = {
  className?: string;
  size?: 'icon' | 'sm-icon'; // This will be changed when I create the new link component so it can actually accept all sizes
};

function MatrixButton({ className, size }: MatrixButtonProps) {
  const t = useTranslations('layout');

  return (
    <Button variant='ghost' size={size} className={className} asChild>
      <Link href='/' title={t('matrix')} aria-label={t('matrix')}>
        <MessageSquareMoreIcon
          className='h-[1.2rem] w-[1.2rem]'
          aria-hidden='true'
        />
      </Link>
    </Button>
  );
}

export { MatrixButton };
