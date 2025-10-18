'use client';

import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function DeleteItemCategoryButton({
  category,
}: {
  category: RouterOutput['storage']['fetchItemCategories'][number];
}) {
  const tUi = useTranslations('ui');
  const t = useTranslations('storage.categories');
  const router = useRouter();
  const utils = api.useUtils();

  const deleteItemCategory = api.storage.deleteItemCategory.useMutation({
    onSuccess: async () => {
      toast.success(t('successDeleteMessage'));
      await Promise.all([
        utils.storage.fetchItemCategories.invalidate(),
        utils.storage.fetchItemCategoryNames.invalidate(),
      ]);
      router.refresh();
    },
  });

  return (
    <Button
      className='w-fit min-w-0 gap-2 sm:w-28'
      type='button'
      variant='destructive'
      onClick={() => deleteItemCategory.mutate(category)}
      disabled={deleteItemCategory.isPending}
    >
      {deleteItemCategory.isPending ? (
        <Spinner />
      ) : (
        <>
          <XIcon className='h-6 w-6 sm:h-8 sm:w-8' />
          <span className='hidden sm:inline'>{tUi('delete')}</span>
        </>
      )}
    </Button>
  );
}

export { DeleteItemCategoryButton };
