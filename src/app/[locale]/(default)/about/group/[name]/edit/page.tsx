import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { GroupForm } from '@/components/groups/GroupForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('groups.update');

  return {
    title: t('title'),
  };
}

export default async function EditGroupPage({
  params,
}: {
  params: Promise<{ locale: Locale; name: string }>;
}) {
  const { locale, name } = await params;
  setRequestLocale(locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('groups.update');

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const group = await api.groups.fetchGroup(name);

  if (!group) {
    return notFound();
  }

  const groupLocalization = group.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!groupLocalization) {
    return notFound();
  }

  const { about, groups, ui } = await getMessages();

  return (
    <>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href={{ pathname: '/about/group/[name]', params: { name } }}
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToGroup')}</span>
        </Link>
        <h1>{t('title')}</h1>
      </div>
      <NextIntlClientProvider
        messages={
          { about, groups, ui } as Pick<Messages, 'about' | 'groups' | 'ui'>
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <GroupForm group={group} />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
