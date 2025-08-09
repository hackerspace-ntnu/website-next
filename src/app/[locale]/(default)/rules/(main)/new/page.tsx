import { ArrowLeftIcon } from 'lucide-react';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { RuleForm } from '@/components/rules/RuleForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('rules.new');

  return {
    title: `${t('title')}`,
  };
}

export default async function NewRulePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('rules');
  const { rules, ui } = await getMessages();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('new.unauthorized'));
  }

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href='/rules'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToRules')}</span>
        </Link>
        <h1>{t('new.title')}</h1>
      </div>
      <NextIntlClientProvider
        messages={{ rules, ui } as Pick<Messages, 'rules' | 'ui'>}
      >
        <div className='mx-auto lg:max-w-2xl'>
          <RuleForm />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
