import { MyReservationsTableSkeleton } from '@/components/reservations/MyReservationsTableSkeleton';
import { ToolCardGridSkeleton } from '@/components/reservations/ToolCardGridSkeleton';

export default function StorageLoading() {
  return (
    <div className='flex flex-col'>
      <ToolCardGridSkeleton />
      <MyReservationsTableSkeleton />
    </div>
  );
}
