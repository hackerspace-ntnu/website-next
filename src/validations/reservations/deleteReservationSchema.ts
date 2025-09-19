import z from 'zod';

function deleteReservationSchema() {
  return z.object({
    reservationId: z.number().positive(),
    toolId: z.number().positive(),
    reservorId: z.number().positive(),
  });
}

export { deleteReservationSchema };
