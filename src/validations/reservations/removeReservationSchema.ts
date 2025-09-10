import z from 'zod';

function removeReservationSchema() {
  return z.object({
    id: z.number(),
  });
}

export { removeReservationSchema };
