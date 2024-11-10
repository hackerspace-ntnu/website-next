import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function EventDetailsLayout({
  children,
}: { children: React.ReactNode }) {
  const t = await getTranslations('events');
  return (
    <>
      <Button variant='secondary' aria-label='Back to Events' asChild>
        <Link href='/events' className='flex gap-2'>
          <ArrowLeftIcon aria-hidden='true' />
          {t('backToEvents')}
        </Link>
      </Button>
      {children}
    </>
  );
}
