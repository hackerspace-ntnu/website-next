import { MyReservationsTableSkeleton } from '@/components/reservations/MyReservationsTableSkeleton';
import { ToolCardGridSkeleton } from '@/components/reservations/ToolCardGridSkeleton';

export default function ReservationsLoading() {
  return (
    <div className='flex flex-col gap-4'>
      <MyReservationsTableSkeleton />
      <ToolCardGridSkeleton />
    </div>
  );
}
