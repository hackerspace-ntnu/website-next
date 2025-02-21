import { MyReservationsItem } from '@/components/reservations/MyReservationsItem';
import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { reservations } from '@/mock-data/reservations';
import { toDate } from 'date-fns/toDate';

function MyReservations() {
  return (
    <div className='items-centermax-w-4xl flex size-full justify-center overflow-auto'>
      <MyReservationsTable
        className='hidden sm:block'
        myReservations={reservations}
      />
      <div className='block sm:hidden'>
        <MyReservationsItem className='block sm:hidden' />
      </div>
    </div>
  );
}

export { MyReservations };
