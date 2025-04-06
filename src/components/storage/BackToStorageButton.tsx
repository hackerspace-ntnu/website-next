import { Link } from '@/components/ui/Link';
import { type VariantProps, cva } from 'cva';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const backToStorageButtonVariants = cva({
  base: 'flex gap-2',
  variants: {
    variant: {
      absolute:
        'md:-translate-y-1/2 p-0 sm:px-2 sm:py-4 md:absolute md:top-1/2 md:left-0',
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
      <span className='hidden sm:inline'>{t('backToStorage')}</span>
    </Link>
  );
}

export { BackToStorageButton };
