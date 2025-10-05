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
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';

function DeleteApplicationButton({
  applicationId,
  t,
}: {
  applicationId: number;
  t: {
    label: string;
    dialogTitle: string;
    dialogDescription: string;
    cancel: string;
    delete: string;
    success: string;
  };
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const deleteApplication = api.applications.deleteApplication.useMutation({
    onSuccess: async () => {
      toast.success(t.success);
      await utils.applications.invalidate();
      router.push('/applications/view');
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' className='mt-6'>
          {t.label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{t.dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
          <AlertDialogActionDestructive
            onClick={() => deleteApplication.mutate({ applicationId })}
          >
            {deleteApplication.isPending ? (
              <Spinner className='text-destructive-foreground' />
            ) : (
              t.delete
            )}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteApplicationButton };
