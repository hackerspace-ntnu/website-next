'use client';

import { useState } from 'react';
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
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type DeleteItemDialogProps = {
  item: RouterOutput['storage']['fetchOne'];
  t: {
    title: string;
    description: string;
    confirm: string;
    cancel: string;
    success: string;
  };
};

function DeleteItemDialog({ item, t }: DeleteItemDialogProps) {
  const router = useRouter();
  const utils = api.useUtils();
  const deleteItem = api.storage.deleteItem.useMutation({
    onSuccess: async () => {
      toast.success(t.success);
      await Promise.all([
        utils.storage.fetchMany.invalidate(),
        utils.storage.itemsTotal.invalidate(),
        utils.storage.fetchOne.invalidate(),
      ]);
      router.push('/storage');
      router.refresh();
    },
  });

  const [open, setOpen] = useState(false);

  function handleDelete() {
    if (!item) return;
    deleteItem.mutate({ id: item.id });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className='flex gap-2' variant='destructive' disabled={!item}>
          {t.title}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.title}</AlertDialogTitle>
          <AlertDialogDescription>{t.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
          <AlertDialogActionDestructive onClick={handleDelete}>
            {t.confirm}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteItemDialog };
