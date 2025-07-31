import { EditGroupForm } from '@/components/about/EditGroupForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import { ArrowLeftIcon } from 'lucide-react';
import { type Messages, NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function EditGroupPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { user } = await api.auth.state();
  const t = await getTranslations('about.edit');

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const { name } = await params;
  const group = await api.about.fetchGroup(name);

  if (!group) {
    return notFound();
  }

  const locale = await getLocale();
  const groupLocalization = group.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!groupLocalization) {
    return notFound();
  }

  const { about, ui } = await getMessages();

  return (
    <main>
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
        messages={{ about, ui } as Pick<Messages, 'about' | 'ui'>}
      >
        <div className='mx-auto lg:max-w-2xl'>
          <EditGroupForm group={group} />
        </div>
      </NextIntlClientProvider>
    </main>
  );
}
