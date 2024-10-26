import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function EventDetailsLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <Link href='/events' aria-label={'Back to events'}>
        <Button variant='secondary' className='flex gap-2'>
          <ArrowLeftIcon aria-hidden='true' />
          <span>Back to Events</span>
        </Button>
      </Link>
      {children}
    </>
  );
}
