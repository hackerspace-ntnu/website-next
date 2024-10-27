import { Button } from '@/components/ui/Button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function EventDetailsLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <Link href='/events'>
        <Button
          variant='secondary'
          className='flex gap-2'
          aria-label='Back to Events'
        >
          <ArrowLeftIcon aria-hidden='true' />
          <span>Back to Events</span>
        </Button>
      </Link>
      {children}
    </>
  );
}
