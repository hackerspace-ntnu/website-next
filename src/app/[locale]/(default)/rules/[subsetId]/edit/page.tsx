import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { RuleForm } from '@/components/rules/RuleForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export default async function EditRulePage({
  params,
}: {
  params: Promise<{ locale: Locale; subsetId: string }>;
}) {
  const { locale, subsetId } = await params;
  setRequestLocale(locale);

  if (Number.isNaN(Number(subsetId))) return notFound();

  const { user } = await api.auth.state();
  const t = await getTranslations('rules');

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('update.unauthorized'));
  }

  const rule = await api.rules.fetchRule(Number(subsetId));

  if (!rule) {
    return notFound();
  }

  const { about, rules, ui } = await getMessages();

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href={{
            pathname: '/rules/[subsetId]',
            params: { subsetId: rule.id },
          }}
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToRules')}</span>
        </Link>
        <h1>{t('title')}</h1>
      </div>
      <NextIntlClientProvider
        messages={
          { about, rules, ui } as Pick<Messages, 'about' | 'rules' | 'ui'>
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <RuleForm rule={rule} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
