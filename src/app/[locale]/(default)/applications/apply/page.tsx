import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ApplyForm } from '@/components/applications/ApplyForm';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('applications.apply');

  return {
    title: t('title'),
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('applications.apply');
  const { applications, settings, ui } = await getMessages();

  const groups = await api.groups.fetchGroupsOpenToApps();
  const groupOptions = groups
    .map((group) => {
      const localization = group.localizations.find(
        (loc) => loc.locale === locale,
      );
      if (!localization) return null;
      return {
        value: group.identifier,
        label: localization?.name,
      };
    })
    .filter((value) => value !== null);

  return (
    <>
      <h1 className='text-center'>{t('title')}</h1>
      <p className='mx-auto max-w-prose text-center'>{t('pageDescription')}</p>
      <NextIntlClientProvider
        messages={
          { applications, settings, ui } as Pick<
            Messages,
            'applications' | 'settings' | 'ui'
          >
        }
      >
        <ApplyForm groups={groupOptions} />
      </NextIntlClientProvider>
    </>
  );
}
