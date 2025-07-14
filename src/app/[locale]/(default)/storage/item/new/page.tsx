import { EditItemForm } from '@/components/storage/EditItemForm';
import { api } from '@/lib/api/server';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
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
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('storage.edit');
  const auth = await api.auth.state();

  if (
    !auth.user?.groups.some((g) =>
      ['labops', 'leadership', 'admin'].includes(g),
    )
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
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
