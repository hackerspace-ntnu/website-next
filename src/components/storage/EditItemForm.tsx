'use client';

import { EditIcon, UploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { DeleteItemDialog } from '@/components/storage/DeleteItemDialog';
import { Badge } from '@/components/ui/Badge';
import { useAppForm } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Link } from '@/components/ui/Link';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { fileToBase64String } from '@/lib/utils/files';
import type { RouterOutput } from '@/server/api';
import { itemSchema } from '@/validations/storage/itemSchema';

type EditItemFormProps = {
  itemCategories: string[];
  prefilledItem?: RouterOutput['storage']['fetchOne'];
  imageUrl?: string;
};

function EditItemForm({
  itemCategories,
  prefilledItem,
  imageUrl,
}: EditItemFormProps) {
  const t = useTranslations('storage.edit');
  const tUi = useTranslations('ui');
  const router = useRouter();
  const utils = api.useUtils();

  const [previewImage, setPreviewImage] = useState(imageUrl);

  const schema = itemSchema(useTranslations(), itemCategories);
  const newItemMutation = api.storage.newItem.useMutation({
    onSuccess: async () => {
      toast.success(t('successNew'));
      await utils.storage.fetchMany.invalidate();
      await utils.storage.itemsTotal.invalidate();
    },
  });
  const editItemMutation = api.storage.editItem.useMutation({
    onSuccess: async () => {
      toast.success(t('successEdit'));
      await utils.storage.fetchOne.invalidate();
      await utils.storage.fetchMany.invalidate();
    },
  });

  const categoryName =
    useLocale() === 'en-GB'
      ? prefilledItem?.category?.nameEnglish
      : prefilledItem?.category?.nameNorwegian;

  const form = useAppForm({
    validators: {
      onChange: schema,
    },
    defaultValues: {
      image: null as string | null,
      nameNorwegian: prefilledItem?.norwegian?.name ?? '',
      nameEnglish: prefilledItem?.english?.name ?? '',
      descriptionNorwegian: prefilledItem?.norwegian?.description ?? '',
      descriptionEnglish: prefilledItem?.english?.description ?? '',
      locationEnglish: prefilledItem?.english?.location ?? '',
      locationNorwegian: prefilledItem?.norwegian?.location ?? '',
      categoryName: categoryName ?? itemCategories[0] ?? '',
      quantity: prefilledItem?.quantity ?? 1,
    },
    onSubmit: ({ value }) => {
      if (prefilledItem) {
        editItemMutation.mutate({ id: prefilledItem.id, ...value });
        router.push({
          pathname: '/storage/item/[itemId]',
          params: { itemId: prefilledItem.id },
        });
      } else {
        newItemMutation.mutate(value);
        router.push('/storage');
      }
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className='max-w-prose space-y-8'
    >
      <form.AppField name='image'>
        {(field) => (
          <div className='group relative h-64 w-64 rounded-lg'>
            <field.BaseField label={t('image.label')}>
              <Input
                className='h-58 w-full cursor-pointer rounded-lg border-none'
                type='file'
                accept='image/jpeg,image/png'
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const base64String = await fileToBase64String(file);
                    setPreviewImage(base64String);
                    field.handleChange(base64String);
                  }
                }}
                onBlur={field.handleBlur}
              />
            </field.BaseField>
            <div className='pointer-events-none absolute bottom-0 left-0'>
              <Image
                className='h-58 w-64 rounded-lg object-cover'
                alt={t('image.label')}
                width='256'
                height='256'
                src={previewImage ?? '/unknown.png'}
              />
            </div>
            <div className='pointer-events-none absolute bottom-0 left-0 flex h-58 w-64 items-center justify-center bg-background/70 opacity-0 transition group-hover:opacity-100'>
              {t('image.upload')}
            </div>
            <Badge className='-bottom-2 -right-2 pointer-events-none absolute rounded-full p-0.5'>
              <UploadIcon className='h-6 w-6' />
            </Badge>
          </div>
        )}
      </form.AppField>
      <form.AppField name='nameNorwegian'>
        {(field) => (
          <field.TextField
            label={t('name.labelNorwegian')}
            placeholder={t('name.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='nameEnglish'>
        {(field) => (
          <field.TextField
            label={t('name.labelEnglish')}
            placeholder={t('name.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='descriptionNorwegian'>
        {(field) => (
          <field.TextAreaField
            label={t('description.labelNorwegian')}
            placeholder={t('description.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='descriptionEnglish'>
        {(field) => (
          <field.TextAreaField
            label={t('description.labelEnglish')}
            placeholder={t('description.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='locationNorwegian'>
        {(field) => (
          <field.TextField
            label={t('location.labelNorwegian')}
            placeholder={t('location.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='locationEnglish'>
        {(field) => (
          <field.TextField
            label={t('location.labelEnglish')}
            placeholder={t('location.placeholder')}
          />
        )}
      </form.AppField>
      <form.AppField name='categoryName'>
        {(field) => (
          <div className='relative w-48'>
            <field.SelectField
              label={t('category.label')}
              options={itemCategories.map((c) => ({ label: c, value: c }))}
              placeholder={itemCategories[0]}
            />
            <Link
              href='/storage/categories'
              variant='default'
              className='-right-2 absolute bottom-1 translate-x-full px-2 py-1'
            >
              <EditIcon className='h-6 w-6' />
            </Link>
          </div>
        )}
      </form.AppField>
      <form.AppField name='quantity'>
        {(field) => <field.NumberField label={t('quantity.label')} min={0} />}
      </form.AppField>
      <div className='flex w-full justify-between'>
        <form.AppForm>
          <form.SubmitButton>{t('submit')}</form.SubmitButton>
        </form.AppForm>
        {prefilledItem && (
          <DeleteItemDialog
            item={prefilledItem}
            t={{
              title: t('deleteItem'),
              description: t('deleteItemDescription'),
              confirm: tUi('confirm'),
              cancel: tUi('cancel'),
              success: t('successDelete'),
            }}
          />
        )}
      </div>
    </form>
  );
}

export { EditItemForm };
