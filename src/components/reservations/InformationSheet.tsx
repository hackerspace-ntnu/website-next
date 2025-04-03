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
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Label } from '../ui/Label';

export default function InformationSheet() {
  const t = useTranslations('reservations');
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
          <SheetTitle className='text-center'>
            {t('information.importantTitle')}
          </SheetTitle>
          <SheetDescription className='mx-auto max-w-xl text-balance text-sm-base-clamp'>
            {t.rich('information.importantText', {
              link: (chunks) => (
                <a href='/regler/5' className='text-primary'>
                  {chunks}
                </a>
              ),
            })}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className='w-full'>
          <div className='flex w-full flex-row items-center justify-center gap-3'>
            <Checkbox id='checkboxInformationSheet' />
            <Label htmlFor='checkboxInformationSheet'>
              {t('information.dontShow')}
            </Label>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
