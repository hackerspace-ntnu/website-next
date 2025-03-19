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
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const tStorage = await getTranslations('storage');
  const t = await getTranslations('storage.edit');

  const { storage, ui } = await getMessages();

  const item = await api.storage.fetchOne(Number(id));
  const itemCategories = await api.storage.fetchItemCategoryNames();

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h1 className='text-center'>
        {tStorage('title')}: {t('titleEdit')}
      </h1>
      <NextIntlClientProvider
        messages={{ storage, ui } as Pick<Messages, 'storage' | 'ui'>}
      >
        <EditItemForm itemCategories={itemCategories} prefilledItem={item} />
      </NextIntlClientProvider>
    </div>
  );
}
