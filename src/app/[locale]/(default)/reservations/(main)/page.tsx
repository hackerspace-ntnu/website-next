import { InformationSheet } from '@/components/reservations/InformationSheet';
import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
import { api } from '@/lib/api/server';
import { tools } from '@/mock-data/reservations';

export default async function ReservationsPage() {
  const { user } = await api.auth.state();
  const userReservations = user
    ? await api.reservations.fetchUserReservations()
    : [];

  return (
    <>
      <InformationSheet />
      <MyReservationsTable
        userReservations={userReservations}
        loggedIn={!!user}
      />
      <ToolCardGrid tools={tools} />
    </>
  );
}
