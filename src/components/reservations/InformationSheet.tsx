'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { Link } from '@/components/ui/Link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';

function InformationSheet() {
  const t = useTranslations('reservations');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = localStorage.getItem('recurringInfoSheet');
    if (show !== 'true') {
      setOpen(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('recurringInfoSheet', 'true');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side='top'
        className='mx-auto mt-6 w-full max-w-3xl rounded-b-lg border border-border'
      >
        <SheetHeader className='mb-5'>
          <SheetTitle className='text-center'>
            {t('information.importantTitle')}
          </SheetTitle>
          <SheetDescription className='clamp-[text-sm-base-clamp] mx-auto max-w-xl text-balance'>
            {t.rich('information.importantText', {
              link: (chunks) => (
                <Link variant='link' href='/rules' className='text-primary'>
                  {chunks}
                </Link>
              ),
            })}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter className='flex w-full flex-row items-center justify-center gap-3'>
          <Checkbox
            id='checkboxInformationSheet'
            onCheckedChange={() => handleSave()}
          />
          <Label htmlFor='checkboxInformationSheet'>
            {t('information.dontShow')}
          </Label>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { InformationSheet };
