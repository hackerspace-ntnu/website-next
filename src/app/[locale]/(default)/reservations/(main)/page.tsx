import InformationSheet from '@/components/reservations/InformationSheet';
import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
import { tools } from '@/mock-data/reservations';

export default async function ReservationsPage() {
  return (
    <>
      <InformationSheet />
      <MyReservationsTable />
      <ToolCardGrid tools={tools} />
    </>
  );
}
