import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { SkillForm } from '@/components/management/SkillForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('management.skills.new');

  return {
    title: `${t('title')}`,
  };
}

export default async function NewSkillPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management');
  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['management', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const { ui, management } = await getMessages();

  return (
    <>
      <Link
        href='/management/skills'
        className='flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={t('skills.backToSkills')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('skills.backToSkills')}
      </Link>
      <h1 className='text-center'>{t('skills.new.title')}</h1>
      <NextIntlClientProvider
        messages={{ ui, management } as Pick<Messages, 'ui' | 'management'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <SkillForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
