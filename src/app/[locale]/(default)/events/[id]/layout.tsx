import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function EventDetailsLayout({
  children,
}: { children: React.ReactNode }) {
  const t = await getTranslations('events');
  return (
    <>
      <Link href='/events'>
        <Button
          variant='secondary'
          className='flex gap-2'
          aria-label='Back to Events'
        >
          <ArrowLeftIcon aria-hidden='true' />
          <span>{t('backToEvents')}</span>
        </Button>
      </Link>
      {children}
    </>
  );
}
