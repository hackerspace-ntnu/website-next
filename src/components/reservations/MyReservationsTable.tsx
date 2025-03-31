'use client';

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
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

type Reservation = {
  toolType: string;
  toolName: string;
  toolSlug: string;
  userId: string;
  reservationId: string;
  start: Date | string;
  end: Date | string;
  navn: string;
  mobilNr: string;
  email: string;
};

export function MyReservationsTable() {
  const t = useTranslations('reservations');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const isDesktop = useMediaQuery('(min-width: 42rem)');
  const [checked, setChecked] = useState<string[]>([]);
  const [editPressed, setEditPressed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const refr = [ref, ref2];
  const loggedIn = true;
  const [smallScreen, setSmallScreen] = useState(false);
  const userId = '5c87e78a-ee0c-4817-82d7-42d857694bed'; // miderltidig for å sjekke conditions på egne vs andres reservasjoner

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
    <div className='mx-auto flex size-full max-w-3xl flex-col gap-1'>
      <div className='flex flex-row justify-between'>
        {loggedIn &&
          (editPressed ? (
            <>
              <Button
                title={t('myReservationsTable.removetitle')}
                ref={ref}
                className='mr-auto rounded-xl'
                variant='secondary'
                onClick={handleRemove}
              >
                {t('myReservationsTable.remove')}
              </Button>
              <Button
                title={t('myReservationsTable.cancelTitle')}
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
        <h3 className='~text-lg/2xl p-3 text-left'>
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
                          <h1 className='~text-sm/base w-full text-center'>
                            {res.toolName}
                          </h1>
                          <div className='~text-xs/sm size-full flex-col'>
                            <p className='mb-2 underline'>
                              {`From: ${format(res.start, 'dd.MMM HH:mm')}`}{' '}
                            </p>
                            <p className='underline'>{`To: ${format(res.end, 'dd.MMM HH:mm')}`}</p>
                          </div>
                          <Link
                            title={t('myReservationsTable.goToCalendar')}
                            href={{
                              pathname: '/reservations/[tool]',
                              params: { tool: res.toolSlug },
                            }}
                            className='mr-4 flex'
                          >
                            <CalendarDays className='~size-16/20' />
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
                        {format(res.start, 'dd.MMM HH:mm')}
                      </TableCell>
                      <TableCell>{format(res.end, 'dd.MMM HH:mm')}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            ) : (
              <TableCaption className='~text-sm/base p-3'>
                {t('myReservationsTable.empty')}
              </TableCaption>
            )
          ) : (
            <TableCaption className='~text-sm/base p-3'>
              {t('myReservationsTable.notLoggedIn')}
            </TableCaption>
          )}
        </Table>
      </div>
    </div>
  );
}
