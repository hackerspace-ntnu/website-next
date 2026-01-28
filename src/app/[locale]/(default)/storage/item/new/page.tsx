import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { EditItemForm } from '@/components/storage/EditItemForm';
import { api } from '@/lib/api/server';

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
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage.edit');
  const { user } = await api.auth.state();

  if (
    !user?.groups.some((g) => ['labops', 'management', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

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
