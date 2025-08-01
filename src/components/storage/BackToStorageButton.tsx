import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/ui/Link';
import { cva, type VariantProps } from '@/lib/utils';

const backToStorageButtonVariants = cva({
  base: 'flex gap-2',
  variants: {
    variant: {
      absolute: 'absolute left-0 flex gap-2 p-2',
    },
  },
});

async function BackToStorageButton({
  variant,
}: {
  variant?: VariantProps<typeof backToStorageButtonVariants>['variant'];
}) {
  const t = await getTranslations('storage');
  return (
    <Link
      className={backToStorageButtonVariants({ variant })}
      variant='ghost'
      size='default'
      href='/storage'
      aria-label={t('backToStorage')}
    >
      <ArrowLeftIcon aria-hidden='true' />
      <span className='hidden md:inline'>{t('backToStorage')}</span>
    </Link>
  );
}

export { BackToStorageButton };
