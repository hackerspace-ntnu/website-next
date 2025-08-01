import { EditGroupForm } from '@/components/about/EditGroupForm';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';
import { ArrowLeftIcon } from 'lucide-react';
import { type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('groups.new');

  return {
    title: `${t('title')}`,
  };
}

export default async function NewGroupPage() {
  const { user } = await api.auth.state();
  const t = await getTranslations('groups');
  const { about, ui } = await getMessages();

  if (
    !user?.groups.some((g) => ['labops', 'leadership', 'admin'].includes(g))
  ) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('new.unauthorized'));
  }

  return (
    <main>
      <div className='relative flex w-full justify-center'>
        <Link
          className='-translate-y-1/2 absolute top-1/2 left-0 flex w-fit items-center gap-2 p-2'
          href='/about'
          variant='ghost'
          size='default'
        >
          <ArrowLeftIcon />
          <span className='hidden md:inline'>{t('backToAbout')}</span>
        </Link>
        <h1>{t('new.title')}</h1>
      </div>
      <NextIntlClientProvider
        messages={{ about, ui } as Pick<Messages, 'about' | 'ui'>}
      >
        <div className='mx-auto lg:max-w-2xl'>
          <EditGroupForm />
        </div>
      </NextIntlClientProvider>
    </main>
  );
}
