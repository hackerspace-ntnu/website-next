import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { GroupForm } from '@/components/groups/GroupForm';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
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
  params: Promise<{ locale: string; name: string }>;
}) {
  const { locale, name } = await params;
  setRequestLocale(locale as Locale);

  const { user } = await api.auth.state();
  const t = await getTranslations('groups.update');

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
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

  const { about, groups, ui, error } = await getMessages();

  const leader = group.leaderId
    ? await api.users.fetchMember({ id: group.leaderId })
    : undefined;
  const deputyLeader = group.deputyLeaderId
    ? await api.users.fetchMember({ id: group.deputyLeaderId })
    : undefined;

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
          { about, groups, ui, error } as Pick<
            Messages,
            'about' | 'groups' | 'ui' | 'error'
          >
        }
      >
        <div className='mx-auto lg:max-w-2xl'>
          <GroupForm
            group={group}
            leader={
              leader && {
                id: leader.id as number,
                firstName: leader.firstName as string,
                lastName: leader.lastName as string,
                profilePictureId: leader.profilePictureId as number,
                profilePictureUrl: leader.profilePictureUrl,
              }
            }
            deputyLeader={
              deputyLeader && {
                id: deputyLeader.id as number,
                firstName: deputyLeader.firstName as string,
                lastName: deputyLeader.lastName as string,
                profilePictureId: deputyLeader.profilePictureId as number,
                profilePictureUrl: deputyLeader.profilePictureUrl,
              }
            }
          />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
