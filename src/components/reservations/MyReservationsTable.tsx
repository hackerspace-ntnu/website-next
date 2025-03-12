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
import { CalendarDays } from 'lucide-react';
import { useState } from 'react';
import React, { useEffect, useRef } from 'react';

type MyReservationsTable = {
  className?: string;
  myReservations: Reservation[];
};

type Reservation = {
  id: number;
  toolName: string;
  toolDescription: string;
  fromDate: string;
  toDate: string;
};

export function MyReservationsTable({ myReservations }: MyReservationsTable) {
  const [reservation, setReservation] = useState<Reservation[]>(myReservations);
  const isDesktop = useMediaQuery('(min-width: 42rem)');
  const [checked, setChecked] = useState<number[]>([]);
  const [editPressed, setEditPressed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const refr = [ref, ref2];
  const loggedIn = true;
  const [smallScreen, setSmallScreen] = useState(false);

  function handleSelectAll(isChecked: boolean) {
    if (isChecked) {
      const allIds = reservation.map((res) => res.id);
      setChecked(allIds);
    } else {
      setChecked([]);
    }
  }

  function handleSelect(id: number, isChecked: boolean) {
    if (isChecked) {
      setChecked((previous) => [...previous, id]);
    } else {
      setChecked((prev) => prev.filter((item) => item !== id));
    }
  }

  function handleRemove() {
    setReservation(reservation.filter((res) => !checked.includes(res.id)));
    setChecked([]);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEditPressed(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  useOutsideClick(refr, () => setEditPressed(false));

  useEffect(() => {
    if (!isDesktop) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
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
          checked={
            reservation.length > 0 && reservation.length === checked.length
          }
          onCheckedChange={(ischecked) => handleSelectAll(ischecked === true)}
          className={cx(
            smallScreen && 'mx-2 flex place-self-center justify-self-center',
          )}
        />
      </TableHead>
    );
  }

  return (
    <div className='mx-auto flex size-full max-w-3xl flex-col gap-2'>
      <div className='flex size-full} flex-row'>
        {loggedIn &&
          (editPressed ? (
            <Button
              ref={ref}
              className='mr-auto rounded-xl'
              variant='secondary'
              onClick={handleRemove}
            >
              Remove
            </Button>
          ) : (
            <Button
              className='ml-auto rounded-xl'
              variant='secondary'
              onClick={() => setEditPressed(true)}
            >
              Edit
            </Button>
          ))}
      </div>
      <div
        ref={ref2}
        className='max-h-96 overflow-auto rounded-xl border bg-secondary/50'
      >
        <Table>
          <TableHeader>
            {smallScreen ? (
              <TableRow>
                {editPressed && loggedIn && selectAllCheckBox()}
                <TableHead className='text-center'>My reservations</TableHead>
              </TableRow>
            ) : (
              <TableRow>
                {editPressed && loggedIn && selectAllCheckBox()}
                <TableHead>My reservations</TableHead>
                <TableHead className='border-x'>From</TableHead>
                <TableHead>To</TableHead>
              </TableRow>
            )}
          </TableHeader>
          {loggedIn ? (
            reservation.length !== 0 ? (
              <TableBody>
                {reservation.map((res) =>
                  smallScreen ? (
                    <TableRow key={res.id}>
                      {editPressed && loggedIn && (
                        <TableCell className='border-r'>
                          <Checkbox
                            checked={checked.includes(res.id)}
                            onCheckedChange={(isChecked) =>
                              handleSelect(res.id, isChecked === true)
                            }
                            className='mx-2 flex place-self-center justify-self-center'
                          />
                        </TableCell>
                      )}
                      <TableCell>
                        <div className='flex w-full flex-row gap-1'>
                          <h1 className='~text-sm/base w-full text-center'>
                            {res.toolName}
                          </h1>
                          <div className='~text-xs/sm size-full flex-col'>
                            <p className='mb-2 underline'>
                              {`From: ${res.fromDate}`}{' '}
                            </p>
                            <p className='underline'>{`To: ${res.toDate}`}</p>
                          </div>
                          <Link href={'/reservations'} className='mx-2 flex'>
                            <CalendarDays className='~size-16/20' />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={res.id}>
                      {editPressed && loggedIn && (
                        <TableCell className='flex items-center justify-center border-r'>
                          <Checkbox
                            checked={checked.includes(res.id)}
                            onCheckedChange={(isChecked) =>
                              handleSelect(res.id, isChecked === true)
                            }
                          />
                        </TableCell>
                      )}
                      <TableCell>{res.toolName}</TableCell>
                      <TableCell className='border-x'>{res.fromDate}</TableCell>
                      <TableCell>{res.toDate}</TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            ) : (
              <TableCaption>You have no reservation</TableCaption>
            )
          ) : (
            <TableCaption>
              <p className='~text-sm/base'>
                You are not logged in. Login to see your reservation.
              </p>
            </TableCaption>
          )}
        </Table>
      </div>
    </div>
  );
}
