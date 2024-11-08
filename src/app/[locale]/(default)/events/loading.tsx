import { EventCardSkeleton } from '@/components/events/EventCardSkeleton';

export default function EventsSkeleton() {
  return (
    <>
      <h1 className='my-4'>Events</h1>
      <h2 className='my-2'>Active events</h2>
      <EventCardSkeleton />
      <h2 className='my-4'>Upcoming events</h2>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
      <h2 className='my-4'>Past events</h2>
      <div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
    </>
  );
}
