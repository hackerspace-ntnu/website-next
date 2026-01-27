import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
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
  const t = await getTranslations('management.skills.edit');

  return {
    title: `${t('title')}`,
  };
}

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ locale: string; skillIdentifier: string }>;
}) {
  const { locale, skillIdentifier } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management');
  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const skill = await api.skills.fetchSkill(skillIdentifier);

  if (!skill) return notFound();

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
      <h1 className='text-center'>{t('skills.edit.title')}</h1>
      <NextIntlClientProvider
        messages={{ ui, management } as Pick<Messages, 'ui' | 'management'>}
      >
        <div className='mx-auto w-full max-w-2xl'>
          <SkillForm skill={skill} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
