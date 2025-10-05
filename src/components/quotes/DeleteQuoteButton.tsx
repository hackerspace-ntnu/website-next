'use client';

import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import type { RouterOutput } from '@/server/api';

function DeleteQuoteButton({
  quote,
  t,
}: {
  quote: RouterOutput['quotes']['fetchQuotes'][number];
  t: {
    title: string;
    description: string;
    cancel: string;
    confirm: string;
    success: string;
  };
}) {
  const router = useRouter();
  const utils = api.useUtils();

  const deleteQuote = api.quotes.deleteQuote.useMutation({
    onSuccess: async () => {
      toast.success(t.success);
      await utils.quotes.invalidate();
      router.refresh();
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='sm-icon'>
          <XIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.title}</AlertDialogTitle>
          <AlertDialogDescription>{t.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
          <AlertDialogActionDestructive
            onClick={() => deleteQuote.mutate({ quoteId: quote.id })}
          >
            {t.confirm}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { DeleteQuoteButton };
