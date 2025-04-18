'use client';

import { DeleteItemCategoryButton } from '@/components/storage/DeleteItemCategoryButton';
import { useAppForm } from '@/components/ui/Form';
import { TableCell, TableRow } from '@/components/ui/Table';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';
import { itemCategoryFormSchema } from '@/validations/storage/itemCategoryFormSchema';
import { CheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useId } from 'react';

function CategoriesTableFormRow({
  category,
}: { category?: RouterOutput['storage']['fetchItemCategories'][number] }) {
  const apiUtils = api.useUtils();
  const router = useRouter();
  const tUi = useTranslations('ui');
  const t = useTranslations('storage.categories');

  const addItemCategoryMutation = api.storage.addItemCategory.useMutation({
    onSuccess: async () => {
      toast.success(t('successAddMessage'));
      await apiUtils.storage.fetchItemCategories.invalidate();
      form.reset();
      router.refresh();
    },
  });

  const editItemCategoryMutation = api.storage.editItemCategory.useMutation({
    onSuccess: async () => {
      toast.success(t('successEditMessage'));
      await apiUtils.storage.fetchItemCategories.invalidate();
      form.reset();
      router.refresh();
    },
  });

  const formSchema = itemCategoryFormSchema(useTranslations());
  const form = useAppForm({
    validators: {
      onChange: formSchema,
    },
    defaultValues: {
      nameEnglish: category?.nameEnglish ?? '',
      nameNorwegian: category?.nameNorwegian ?? '',
    },
    onSubmit: ({ value }) => {
      if (category) {
        editItemCategoryMutation.mutate({ id: category.id, ...value });
      } else {
        addItemCategoryMutation.mutate(value);
      }
    },
  });

  return (
    <TableRow key={category?.id || useId()}>
      <TableCell>{category?.id || null}</TableCell>
      <TableCell>
        <form
          className='grid grid-cols-4 gap-4'
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.AppField name='nameNorwegian'>
            {(field) => (
              <field.TextField
                label=''
                placeholder='Kategorinavn'
                className='space-y-0'
              />
            )}
          </form.AppField>
          <form.AppField name='nameEnglish'>
            {(field) => (
              <field.TextField
                label=''
                placeholder='Category name'
                className='space-y-0'
              />
            )}
          </form.AppField>
          <form.AppForm>
            <form.SubmitButton
              className='flex w-32 gap-2'
              variant='secondary'
              loading={
                addItemCategoryMutation.isPending ||
                editItemCategoryMutation.isPending
              }
              spinnerClassName='text-primary'
            >
              <>
                <CheckIcon className='h-8 w-8' />
                <span>{tUi('save')}</span>
              </>
            </form.SubmitButton>
          </form.AppForm>
          {category && <DeleteItemCategoryButton category={category} />}
        </form>
      </TableCell>
    </TableRow>
  );
}

export { CategoriesTableFormRow };
