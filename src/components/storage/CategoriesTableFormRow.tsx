'use client';

import { DeleteItemCategoryButton } from '@/components/storage/DeleteItemCategoryButton';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
  useForm,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
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
  const form = useForm(formSchema, {
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
        <Form
          className='flex justify-between space-y-0'
          onSubmit={form.handleSubmit}
        >
          <div className='grid grid-cols-4 gap-4'>
            <form.Field name='nameNorwegian'>
              {(field) => (
                <FormItem errors={field.state.meta.errors}>
                  <FormControl>
                    <Input
                      placeholder='Kategorinavn'
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>
            <form.Field name='nameEnglish'>
              {(field) => (
                <FormItem errors={field.state.meta.errors}>
                  <FormControl>
                    <Input
                      placeholder='Category name'
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </form.Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isPristine]}
            >
              {([canSubmit, isPristine]) => (
                <Button
                  className='flex w-32 gap-2'
                  variant='secondary'
                  disabled={
                    !canSubmit ||
                    isPristine ||
                    editItemCategoryMutation.isPending ||
                    addItemCategoryMutation.isPending
                  }
                >
                  {editItemCategoryMutation.isPending ||
                  addItemCategoryMutation.isPending ? (
                    <Spinner />
                  ) : (
                    <>
                      <CheckIcon className='h-8 w-8' />
                      <span>{tUi('save')}</span>
                    </>
                  )}
                </Button>
              )}
            </form.Subscribe>
            {category && <DeleteItemCategoryButton category={category} />}
          </div>
        </Form>
      </TableCell>
    </TableRow>
  );
}

export { CategoriesTableFormRow };
