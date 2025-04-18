'use client';

import { DeleteItemDialog } from '@/components/storage/DeleteItemDialog';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useForm } from '@/components/ui/Form';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Link } from '@/components/ui/Link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import { useRouter } from '@/lib/locale/navigation';
import { fileToBase64String } from '@/lib/utils/files';
import type { RouterOutput } from '@/server/api';
import { itemSchema } from '@/validations/storage/itemSchema';
import { EditIcon, UploadIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

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
    useLocale() === 'en'
      ? prefilledItem?.category?.nameEnglish
      : prefilledItem?.category?.nameNorwegian;

  const form = useForm(schema, {
    validators: {
      onChange: schema,
    },
    defaultValues: {
      image: undefined as string | undefined,
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
    <Form onSubmit={form.handleSubmit} className='max-w-prose space-y-8'>
      <form.Field name='image'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('image.label')}</FormLabel>
            <div className='group relative h-64 w-64 rounded-lg'>
              <FormControl>
                <Input
                  className='h-full w-full cursor-pointer'
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
              </FormControl>
              <div className='pointer-events-none absolute top-0 left-0 overflow-hidden'>
                <Image
                  className='h-64 w-64 rounded-lg object-cover'
                  alt={t('image.label')}
                  width='256'
                  height='256'
                  src={previewImage ?? '/unknown.png'}
                />
              </div>
              <div className='pointer-events-none absolute top-0 left-0 flex h-full w-full items-center justify-center bg-background/70 opacity-0 transition group-hover:opacity-100'>
                {t('image.upload')}
              </div>
              <Badge className='-bottom-2 -right-2 pointer-events-none absolute rounded-full p-0.5'>
                <UploadIcon className='h-6 w-6' />
              </Badge>
            </div>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='nameNorwegian'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('name.labelNorwegian')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('name.placeholder')}
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
            <FormLabel>{t('name.labelEnglish')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('name.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='descriptionNorwegian'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('description.labelNorwegian')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('description.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='descriptionEnglish'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('description.labelEnglish')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('description.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='locationNorwegian'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('location.labelNorwegian')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('location.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='locationEnglish'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('location.labelEnglish')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('location.placeholder')}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='categoryName'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('category.label')}</FormLabel>
            <div className='flex gap-2'>
              <FormControl>
                <Select
                  onValueChange={field.handleChange}
                  defaultValue={field.state.value}
                >
                  <SelectTrigger className='w-64'>
                    <SelectValue placeholder={itemCategories[0]} />
                  </SelectTrigger>
                  <SelectContent>
                    {itemCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <Link
                href='/storage/categories'
                variant='default'
                className='px-2 py-1'
              >
                <EditIcon className='h-6 w-6' />
              </Link>
            </div>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <form.Field name='quantity'>
        {(field) => (
          <FormItem errors={field.state.meta.errors}>
            <FormLabel>{t('quantity.label')}</FormLabel>
            <FormControl>
              <Input
                type='number'
                min={0}
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      </form.Field>
      <div className='flex w-full justify-between'>
        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button type='submit' disabled={!canSubmit}>
              {t('submit')}
            </Button>
          )}
        </form.Subscribe>
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
    </Form>
  );
}

export { EditItemForm };
