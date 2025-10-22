import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';

async function BackToStorageButton({ className }: { className?: string }) {
  const t = await getTranslations('storage');
  return (
    <Link
      className={cx('flex w-fit gap-2', className)}
      variant='ghost'
      size='default'
      href='/storage'
      aria-label={t('backToStorage')}
    >
      <ArrowLeftIcon aria-hidden='true' />
      <span>{t('backToStorage')}</span>
    </Link>
  );
}

export { BackToStorageButton };
