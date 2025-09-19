'use client';

import { format } from 'date-fns';
import { enGB, nb } from 'date-fns/locale';
import { CalendarDays, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type RefObject, useEffect, useRef, useState } from 'react';
import { DeleteReservationButton } from '@/components/reservations/DeleteReservationButton';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';

type Reservation = {
  toolType: string;
  toolName: string;
  toolId: number;
  userId: number;
  reservationId: string;
  start: Date | string;
  end: Date | string;
  name: string;
  phoneNr: string;
  email: string;
};

type MyReservationsTableProps = {
  userReservations: RouterOutput['reservations']['fetchUserReservations'];
  loggedIn: boolean;
};

function MyReservationsTable({
  userReservations,
  loggedIn,
}: MyReservationsTableProps) {
  const t = useTranslations('reservations');
  const isDesktop = useMediaQuery('(min-width: 42rem)');
  const [editPressed, setEditPressed] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEditPressed(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useOutsideClick([ref, ref2, ref3], () => setEditPressed(false));

  return (
    <div className='mx-auto my-3 flex h-full w-full max-w-3xl flex-col gap-1'>
      {loggedIn &&
        (editPressed ? (
          <Button
            title={t('myReservationsTable.cancelTitle')}
            ref={ref as RefObject<HTMLButtonElement>}
            className='ml-auto rounded-xl'
            variant='secondary'
            onClick={() => setEditPressed(false)}
          >
            {t('myReservationsTable.cancel')}
          </Button>
        ) : (
          <Button
            title={t('myReservationsTable.editTitle')}
            className='ml-auto rounded-xl'
            variant='secondary'
            onClick={() => setEditPressed(true)}
          >
            {t('myReservationsTable.edit')}
          </Button>
        ))}

      <div
        ref={ref2}
        className='max-h-96 overflow-auto rounded-xl border bg-secondary/50'
      >
        <h3 className='clamp-[text-lg-4xl-clamp] p-3 text-left'>
          {t('myReservationsTable.title')}
        </h3>
        <Table>
          {isDesktop && (
            <TableHeader>
              <TableRow className='border-t'>
                {editPressed && <TableHead className='border-x' />}
                <TableHead>{t('myReservationsTable.tool')}</TableHead>
                <TableHead className='border-x'>
                  {t('myReservationsTable.from')}
                </TableHead>
                <TableHead>{t('myReservationsTable.to')}</TableHead>
              </TableRow>
            </TableHeader>
          )}
          {loggedIn ? (
            userReservations.length !== 0 ? (
              <TableBody>
                {userReservations.map((res) =>
                  !isDesktop ? (
                    <TableRow key={res.reservation.id}>
                      {editPressed && loggedIn && (
                        <TableCell className='border-r'>
                          <DeleteReservationButton
                            className='mx-2 flex place-self-center justify-self-center'
                            reservationId={res.reservation.id}
                            toolId={res.reservation.toolId}
                            reservorId={res.reservation.reservorId}
                            ref={ref3}
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex w-full flex-row justify-between gap-3'>
                          <Link
                            href={{
                              pathname: '/reservations/[reservationId]',
                              params: { reservationId: res.toolSlug },
                            }}
                          >
                            <h1 className='clamp-[text-sm-base-clamp] w-full text-center'>
                              {res.toolName}
                            </h1>
                          </Link>
                          <div className='~text-xs/sm size-full flex-col'>
                            <p className='mb-2 underline'>
                              {`From: ${format(res.reservation.reservedFrom, 'dd.MMM HH:mm', { locale: t('calendar.locale') === 'en' ? enGB : nb })}`}{' '}
                            </p>
                            <p className='underline'>{`To: ${format(res.reservation.reservedTill, 'dd.MMM HH:mm', { locale: t('calendar.locale') === 'en' ? enGB : nb })}`}</p>
                          </div>
                          <Link
                            title={t('myReservationsTable.goToCalendar')}
                            href={{
                              pathname: '/reservations/[reservationId]',
                              params: { reservationId: res.reservation.id },
                            }}
                            className='mr-4 flex'
                          >
                            <CalendarDays className='clamp-[size-16-20-clamp]' />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={res.reservation.id}>
                      {editPressed && loggedIn && (
                        <TableCell className='flex items-center justify-center border-r'>
                          <DeleteReservationButton
                            className='mx-2 flex place-self-center justify-self-center'
                            reservationId={res.reservation.id}
                            toolId={res.reservation.toolId}
                            reservorId={res.reservation.reservorId}
                            ref={ref3}
                          />
                        </TableCell>
                      )}
                      <TableCell>{res.toolName}</TableCell>
                      <TableCell className='border-x'>
                        {format(res.reservation.reservedFrom, 'dd.MMM HH:mm', {
                          locale: t('calendar.locale') === 'en' ? enGB : nb,
                        })}
                      </TableCell>
                      <TableCell>
                        {format(res.reservation.reservedTill, 'dd.MMM HH:mm', {
                          locale: t('calendar.locale') === 'en' ? enGB : nb,
                        })}
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            ) : (
              <TableCaption className='clamp-[text-sm-base-clamp] p-3'>
                {t('myReservationsTable.empty')}
              </TableCaption>
            )
          ) : (
            <TableCaption className='clamp-[text-sm-base-clamp] p-3'>
              {t('myReservationsTable.notLoggedIn')}
            </TableCaption>
          )}
        </Table>
      </div>
    </div>
  );
}

export { MyReservationsTable };
