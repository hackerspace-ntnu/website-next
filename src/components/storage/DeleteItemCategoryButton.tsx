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
  const apiUtils = api.useUtils();

  const deleteItemCategoryMutation = api.storage.deleteItemCategory.useMutation(
    {
      onSuccess: async () => {
        toast.success(t('successDeleteMessage'));
        await apiUtils.storage.fetchItemCategories.invalidate();
        router.refresh();
      },
    },
  );

  async function handleDelete() {
    await deleteItemCategoryMutation.mutateAsync(category);
  }

  return (
    <Button
      className='flex w-32 gap-2'
      type='button'
      variant='destructive'
      onClick={handleDelete}
      disabled={deleteItemCategoryMutation.isPending}
    >
      {deleteItemCategoryMutation.isPending ? (
        <Spinner />
      ) : (
        <>
          <XIcon className='h-8 w-8' />
          <span>{tUi('delete')}</span>
        </>
      )}
    </Button>
  );
}

export { DeleteItemCategoryButton };
