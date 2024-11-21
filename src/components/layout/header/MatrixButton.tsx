import { Button } from '@/components/ui/Button';
import { MessageSquareMoreIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

function MatrixButton() {
  const t = useTranslations('layout');

  return (
    <Button variant='ghost' size='icon' asChild>
      <Link href='/' title={t('matrix')}>
        <MessageSquareMoreIcon className='h-[1.2rem] w-[1.2rem]' aria-hidden />
      </Link>
    </Button>
  );
}

export { MatrixButton };
