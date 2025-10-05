'use client';

import { useFormatter, useTranslations } from 'next-intl';
import { DeleteReservationButton } from '@/components/reservations/DeleteReservationButton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Link } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type MyReservationsTableProps = {
  userReservations: RouterOutput['reservations']['fetchUserReservations'];
  loggedIn: boolean;
};

function MyReservationsTable({
  userReservations,
  loggedIn,
}: MyReservationsTableProps) {
  const t = useTranslations('reservations');
  const format = useFormatter();

  const formatDate = (value: string | number | Date) => {
    const d = value instanceof Date ? value : new Date(value);
    return format.dateTime(d, {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasReservations = userReservations?.length > 0;

  const header = (
    <TableHeader>
      <TableRow className='border-t'>
        <TableHead>{t('myReservationsTable.tool')}</TableHead>
        <TableHead className='border-x'>
          {t('myReservationsTable.from')}
        </TableHead>
        <TableHead>{t('myReservationsTable.until')}</TableHead>
        <TableHead className='w-12 p-0 text-center' aria-label='delete' />
      </TableRow>
    </TableHeader>
  );

  return (
    <div className='mx-auto my-3 flex h-full w-full max-w-3xl flex-col gap-1'>
      <div className='max-h-96 overflow-auto rounded-xl border bg-secondary/50'>
        <h3 className='clamp-[text-lg-4xl-clamp] p-3 text-center'>
          {t('myReservationsTable.title')}
        </h3>
        <Table className='table-fixed'>
          {loggedIn && header}
          {!loggedIn ? (
            <TableCaption className='clamp-[text-sm-base-clamp] p-3'>
              {t('myReservationsTable.notLoggedIn')}
            </TableCaption>
          ) : !hasReservations ? (
            <TableCaption className='clamp-[text-sm-base-clamp] p-3'>
              {t('myReservationsTable.empty')}
            </TableCaption>
          ) : (
            <TableBody>
              {userReservations.map((res) => (
                <TableRow key={res.reservation.id}>
                  <TableCell>
                    <Link
                      href={{
                        pathname: '/reservations/[calendarId]',
                        params: { calendarId: res.toolId },
                      }}
                      className='text-primary'
                    >
                      {res.toolName}
                    </Link>
                  </TableCell>

                  <TableCell className='border-x'>
                    {formatDate(res.reservation.reservedFrom)}
                  </TableCell>

                  <TableCell>
                    {formatDate(res.reservation.reservedUntil)}
                  </TableCell>

                  <TableCell className='w-12 border-l p-0 text-center align-middle'>
                    <DeleteReservationButton
                      className='inline-flex h-8 w-8 items-center justify-center rounded-md p-0'
                      reservationId={res.reservation.id}
                      toolId={res.reservation.toolId}
                      userId={res.reservation.userId}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}

export { MyReservationsTable };
