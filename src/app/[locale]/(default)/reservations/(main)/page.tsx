import { MyReservationsTable } from '@/components/reservations/MyReservationsTable';
import { ToolCardGrid } from '@/components/reservations/ToolCardGrid';
import { api } from '@/lib/api/server';

export default async function ReservationsPage() {
  const { user } = await api.auth.state();
  const userReservations = user
    ? await api.reservations.fetchUserReservations()
    : [];
  const tools = await api.tools.fetchTools();
  const toolsWithImageUrl = await Promise.all(
    tools.map(async (t) => ({
      ...t,
      imageUrl: t.imageId
        ? await api.utils.getFileUrl({ fileId: t.imageId })
        : null,
    })),
  );

  return (
    <>
      <MyReservationsTable
        userReservations={userReservations}
        loggedIn={!!user}
      />
      <ToolCardGrid tools={toolsWithImageUrl} user={user} />
    </>
  );
}
