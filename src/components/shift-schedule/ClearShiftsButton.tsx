'use client';

import { Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
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

function ClearShiftsButton() {
  const t = useTranslations('shiftSchedule.clearShifts');

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const utils = api.useUtils();
  const clearShifts = api.shiftSchedule.clearShifts.useMutation({
    onSuccess: async () => {
      toast.success(t('clearSuccess'));
      await utils.shiftSchedule.invalidate();
      router.refresh();
    },
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
          <AlertDialogActionDestructive onClick={() => clearShifts.mutate()}>
            {t('confirm')}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ClearShiftsButton };
