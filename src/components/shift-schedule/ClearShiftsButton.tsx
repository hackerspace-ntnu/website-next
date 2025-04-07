'use client';

import {
  AlertDialog,
  AlertDialogActionDestructive,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

function ClearShifts() {
  const t = useTranslations('shiftSchedule.clearShifts');

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const utils = api.useUtils();
  const clearShifts = api.shiftSchedule.clearShifts.useMutation({
    onSuccess: () => toast.success(t('clearSuccess')),
  });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='link' className='flex gap-3 text-destructive'>
          <Trash2Icon />
          {t('clear')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className='text-3xl'>{t('warning')}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>{t('confirmationPrompt')}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogActionDestructive
            onClick={async () => {
              clearShifts.mutate();
              await utils.shiftSchedule.fetchShifts.invalidate();
              router.refresh();
            }}
          >
            {t('confirm')}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ClearShifts };
