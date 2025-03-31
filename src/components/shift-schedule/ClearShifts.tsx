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
import { useState } from 'react';
import { toast } from 'sonner';

type ClearShiftsProps = {
  t: {
    clear: string;
    warning: string;
    confirmationPrompt: string;
    confirm: string;
    cancel: string;
    clearSuccess: string;
  };
};

function ClearShifts({ t }: ClearShiftsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const utils = api.useUtils();
  const clearShifts = api.shiftSchedule.clearShifts.useMutation();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='link' className='flex gap-3 text-destructive'>
          <Trash2Icon />
          {t.clear}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <span className='text-3xl'>{t.warning}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span>{t.confirmationPrompt}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            {t.cancel}
          </AlertDialogCancel>
          <AlertDialogActionDestructive
            onClick={async () => {
              await clearShifts.mutateAsync(undefined, {
                onSuccess: () => toast.success(t.clearSuccess),
              });
              await utils.shiftSchedule.fetchShifts.invalidate();
              router.refresh();
            }}
          >
            {t.confirm}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ClearShifts };
