import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';

export default function EventDetailsLoading() {
  return (
    <>
      <Skeleton className='my-4 h-10 w-3/4 rounded-lg lg:h-12' />
      <Skeleton className='h-8 w-1/2 rounded-lg' />
      <div className='mt-4 space-y-4'>
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-8 w-8' />
          <Skeleton className='h-6 w-64 rounded-lg' />
        </div>
        <div className='flex items-center gap-2'>
          <MapPinIcon className='h-8 w-8' />
          <Skeleton className='h-6 w-32 rounded-lg' />
        </div>
        <Separator />
        <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
          <Skeleton className='h-36 w-full min-w-64 max-w-prose rounded-lg' />
          <Skeleton className='h-96 w-full max-w-144 rounded-lg md:h-52 md:w-64 lg:h-96 lg:w-full' />
        </div>
      </div>
    </>
  );
}
