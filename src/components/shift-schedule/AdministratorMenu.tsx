'use client';

import { Button } from '@/components/ui/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { api } from '@/lib/api/client';
import { ChevronDownIcon, ChevronUpIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type AdministratorMenuProps = {
  t: {
    label: string;
    clearShiftSchedule: string;
    warning: string;
    confirmationPrompt: string;
    confirm: string;
    cancel: string;
  };
};

function AdministratorMenu({ t }: AdministratorMenuProps) {
  const tUi = useTranslations('ui');
  const [isOpen, setIsOpen] = useState(false);
  const [isClearShiftsOpen, setIsClearShiftsOpen] = useState(false);
  const clearShifts = api.shiftSchedule.clearShifts.useMutation();

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='mx-auto xs:mx-8 mt-8 rounded border p-3'
    >
      <div className='mx-1 flex justify-between'>
        <span className='my-auto font-semibold text-xl'>{t.label}</span>
        <CollapsibleTrigger asChild>
          <Button
            variant='ghost'
            aria-label={isOpen ? tUi('close') : tUi('open')}
          >
            {isOpen ? (
              <ChevronUpIcon aria-hidden='true' className='size-4' />
            ) : (
              <ChevronDownIcon aria-hidden='true' className='size-4' />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='mt-2'>
        {/* Clear Shifts */}
        <Dialog open={isClearShiftsOpen} onOpenChange={setIsClearShiftsOpen}>
          <DialogTrigger asChild>
            <Button variant='link' className='flex gap-3 text-destructive'>
              <Trash2Icon />
              {t.clearShiftSchedule}
            </Button>
          </DialogTrigger>
          <DialogContent className='w-fit'>
            <DialogHeader>
              <DialogTitle>
                <span className='text-3xl'>{t.warning}</span>
              </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col gap-2'>
              <span>{t.confirmationPrompt}</span>
              <div className='flex justify-center gap-8'>
                <Button
                  variant='destructive'
                  onClick={() => {
                    clearShifts.mutateAsync();
                    setIsClearShiftsOpen(false);
                    setIsOpen(false);
                  }}
                >
                  {t.confirm}
                </Button>
                <Button
                  variant='outline'
                  onClick={() => setIsClearShiftsOpen(false)}
                >
                  {t.cancel}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CollapsibleContent>
    </Collapsible>
  );
}

export { AdministratorMenu };
