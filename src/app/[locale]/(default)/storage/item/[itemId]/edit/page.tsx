import { EditItemForm } from '@/components/storage/EditItemForm';
import { api } from '@/lib/api/server';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('storage');

  return {
    title: `${t('title')}: ${t('edit.titleEdit')}`,
  };
}

export default async function EditStorageItemPage({
  params,
}: {
  params: Promise<{ locale: string; itemId: string }>;
}) {
  const { locale, itemId } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage.edit');

  const { storage, ui } = await getMessages();

  const item = await api.storage.fetchOne(Number(itemId));
  const itemCategories = await api.storage.fetchItemCategoryNames();

  const auth = await api.auth.state();

  const imageUrl = item.imageId
    ? await api.utils.getFileUrl({ fileId: item.imageId })
    : undefined;

  if (
    !auth.user?.groups.some((g) =>
      ['labops', 'leadership', 'admin'].includes(g),
    )
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unathorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  return (
    <div className='mx-auto max-w-prose'>
      <NextIntlClientProvider
        messages={{ storage, ui } as Pick<Messages, 'storage' | 'ui'>}
      >
        <EditItemForm
          itemCategories={itemCategories}
          prefilledItem={item}
          imageUrl={imageUrl}
        />
      </NextIntlClientProvider>
    </div>
  );
}
