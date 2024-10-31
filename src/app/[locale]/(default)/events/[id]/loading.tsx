import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';
import { CalendarIcon, MapPinIcon } from 'lucide-react';

export default function EventDetailsLoading() {
  return (
    <>
      <Skeleton className='my-4 h-12 w-3/4 rounded-lg' />
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
        <div className='flex justify-between'>
          <Skeleton className='h-36 w-3/5 rounded-lg' />
          <Skeleton className='h-48 w-48 rounded-full' />
        </div>
      </div>
    </>
  );
}
