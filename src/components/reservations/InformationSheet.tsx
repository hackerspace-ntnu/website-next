'use client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { useEffect, useState } from 'react';

export default function InformationSheet() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const dontShow = localStorage.getItem('dontShowAgain');
    if (!dontShow) {
      setOpen(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('dontShowAgain', 'true');
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side='top'
        className='mx-auto w-full max-w-3xl rounded-b-lg border border-border'
      >
        <SheetHeader className='mb-3'>
          <SheetTitle className='text-center'>Viktig informasjon</SheetTitle>
          <SheetDescription className='~text-sm/base mx-auto max-w-xl'>
            Les{' '}
            <a className='text-primary' href='/regler/5'>
              regler for bruk av 3D-printer
            </a>{' '}
            før du starter.
            <br />
            <br />
            Ved å benytte reservasjonssystemet vårt setter vi av våre ressurser
            (både printer og folk på vakt som følger med).
            <br />
            Det er derfor forventet at du møter opp tidsnok (gjerne 5 minutter
            før avsatt tid) og ikke går over tiden du har booket.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className='w-full'>
          <div className='flex w-full flex-row items-center justify-center gap-3'>
            <Checkbox /> Ikke vis dette igjen
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
