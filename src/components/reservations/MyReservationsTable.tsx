'use client';

import { format } from 'date-fns';
import { enGB, nb } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type RefObject, useEffect, useRef, useState } from 'react';
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

type Reservation = {
  toolType: string;
  toolName: string;
  toolId: string;
  userId: string;
  reservationId: string;
  start: Date | string;
  end: Date | string;
  name: string;
  phoneNr: string;
  email: string;
};

function MyReservationsTable() {
  const t = useTranslations('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const isDesktop = useMediaQuery('(min-width: 42rem)');
  const [checked, setChecked] = useState<string[]>([]);
  const [editPressed, setEditPressed] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const refr = [ref, ref2];
  const loggedIn = true;
  const [smallScreen, setSmallScreen] = useState(false);
  const userId = '9c62462d-9695-4e37-9ddb-e1576998f475'; // miderltidig for å sjekke conditions på egne vs andres reservasjoner

  useEffect(() => {
    const stored = localStorage.getItem('reservations');
    if (stored) {
      const parsed = JSON.parse(stored) as Reservation[];
      setReservations(parsed.filter((res) => res.userId === userId));
    }
  }, []);

  function handleSelectAll(isChecked: boolean) {
    if (isChecked) {
      const allIds = reservations.map((res) => res.reservationId);
      setChecked(allIds);
    } else {
      setChecked([]);
    }
  }

  function handleSelect(id: string, isChecked: boolean) {
    setChecked((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id),
    );
  }

  function handleRemove() {
    const updated = reservations.filter(
      (res) => !checked.includes(res.reservationId),
    );
    setReservations(updated);
    localStorage.setItem('reservations', JSON.stringify(updated));
    setChecked([]);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEditPressed(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useOutsideClick(refr, () => setEditPressed(false));

  useEffect(() => {
    setSmallScreen(!isDesktop);
  }, [isDesktop]);

  function selectAllCheckBox() {
    return (
      <TableHead
        className={cx(
          smallScreen
            ? 'border-r'
            : 'flex items-center justify-center border-r',
        )}
      >
        <Checkbox
          title={t('myReservationsTable.checkboxAllTitle')}
          checked={
            reservations.length > 0 && reservations.length === checked.length
          }
          onCheckedChange={(isChecked) => handleSelectAll(isChecked === true)}
          className={cx(smallScreen && 'mx-2 flex place-self-center')}
        />
      </TableHead>
    );
  }

  return (
    <div className='mx-auto flex h-full w-full max-w-3xl flex-col gap-1'>
      <div className='flex flex-row justify-between'>
        {loggedIn &&
          (editPressed ? (
            <>
              <Button
                title={t('myReservationsTable.removetitle')}
                ref={ref as RefObject<HTMLButtonElement>}
                className='mr-auto rounded-xl'
                variant='secondary'
                onClick={handleRemove}
              >
                {t('myReservationsTable.remove')}
              </Button>
              <Button
                title={t('myReservationsTable.cancelTitle')}
                ref={ref as RefObject<HTMLButtonElement>}
                className='ml-auto rounded-xl'
                variant='secondary'
                onClick={() => setEditPressed(false)}
              >
                {t('myReservationsTable.cancel')}
              </Button>
            </>
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
      </div>
      <div
        ref={ref2}
        className='max-h-96 overflow-auto rounded-xl border bg-secondary/50'
      >
        <h3 className='clamp-[text-lg-4xl-clamp] p-3 text-left'>
          {t('myReservationsTable.title')}
        </h3>
        <Table>
          <TableHeader>
            {smallScreen ? (
              <TableRow className='border-t'>
                {editPressed && loggedIn && selectAllCheckBox()}
                <TableHead className='text-center'>Tool</TableHead>
              </TableRow>
            ) : (
              <TableRow className='border-t'>
                {editPressed && loggedIn && selectAllCheckBox()}
                <TableHead>{t('myReservationsTable.tool')}</TableHead>
                <TableHead className='border-x'>
                  {t('myReservationsTable.from')}
                </TableHead>
                <TableHead>{t('myReservationsTable.to')}</TableHead>
              </TableRow>
            )}
          </TableHeader>
          {loggedIn ? (
            reservations.length !== 0 ? (
              <TableBody>
                {reservations.map((res) =>
                  smallScreen ? (
                    <TableRow key={res.reservationId}>
                      {editPressed && loggedIn && (
                        <TableCell className='border-r'>
                          <Checkbox
                            checked={checked.includes(res.reservationId)}
                            onCheckedChange={(isChecked) =>
                              handleSelect(
                                res.reservationId,
                                isChecked === true,
                              )
                            }
                            className='mx-2 flex place-self-center justify-self-center'
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex w-full flex-row justify-between gap-3'>
                          <h1 className='clamp-[text-sm-base-clamp] w-full text-center'>
                            {res.toolName}
                          </h1>
                          <div className='~text-xs/sm size-full flex-col'>
                            <p className='mb-2 underline'>
                              {`From: ${format(res.start, 'dd.MMM HH:mm', { locale: t('calendar.locale') === 'en' ? enGB : nb })}`}{' '}
                            </p>
                            <p className='underline'>{`To: ${format(res.end, 'dd.MMM HH:mm', { locale: t('calendar.locale') === 'en' ? enGB : nb })}`}</p>
                          </div>
                          <Link
                            title={t('myReservationsTable.goToCalendar')}
                            href={{
                              pathname: '/reservations/[id]',
                              params: { id: res.toolId },
                            }}
                            className='mr-4 flex'
                          >
                            <CalendarDays className='clamp-[size-16-20-clamp]' />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={res.reservationId}>
                      {editPressed && loggedIn && (
                        <TableCell className='flex items-center justify-center border-r'>
                          <Checkbox
                            checked={checked.includes(res.reservationId)}
                            onCheckedChange={(isChecked) =>
                              handleSelect(
                                res.reservationId,
                                isChecked === true,
                              )
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell>{res.toolName}</TableCell>
                      <TableCell className='border-x'>
                        {format(res.start, 'dd.MMM HH:mm', {
                          locale: t('calendar.locale') === 'en' ? enGB : nb,
                        })}
                      </TableCell>
                      <TableCell>
                        {format(res.end, 'dd.MMM HH:mm', {
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
