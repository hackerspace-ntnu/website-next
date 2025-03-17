import { NewItemForm } from '@/components/storage/NewItemForm';
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
    title: `${t('title')}: ${t('new.title')}`,
  };
}

export default async function StoragePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tStorage = await getTranslations('storage');
  const t = await getTranslations('storage.new');

  const { storage, ui } = await getMessages();

  const itemCategories = await api.storage.fetchItemCategoryNames();

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h1 className='text-center'>
        {tStorage('title')}: {t('title')}
      </h1>
      <NextIntlClientProvider
        messages={{ storage, ui } as Pick<Messages, 'storage' | 'ui'>}
      >
        <NewItemForm itemCategories={itemCategories} />
      </NextIntlClientProvider>
    </div>
  );
}
