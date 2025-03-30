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
    title: `${t('title')}: ${t('edit.titleNew')}`,
  };
}

export default async function NewStorageItemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tStorage = await getTranslations('storage');
  const t = await getTranslations('storage.edit');

  const { storage, ui } = await getMessages();

  const itemCategories = await api.storage.fetchItemCategoryNames();

  return (
    <div className='mx-auto max-w-prose'>
      <NextIntlClientProvider
        messages={{ storage, ui } as Pick<Messages, 'storage' | 'ui'>}
      >
        <EditItemForm itemCategories={itemCategories} />
      </NextIntlClientProvider>
    </div>
  );
}
