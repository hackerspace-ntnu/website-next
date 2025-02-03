import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { notFound } from 'next/navigation';

import { LogoLink } from '@/components/layout/LogoLink';
import { Main } from '@/components/layout/Main';
import { SidebarNav } from '@/components/settings/SidebarNav';
import { Separator } from '@/components/ui/Separator';

import { api } from '@/lib/api/server';

type SettingsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamic = 'force-dynamic';

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { settings, ui } = await getMessages();
  const t = await getTranslations('settings');
  const t_layout = await getTranslations('layout');

  const { session } = await api.auth.state();

  if (!session) {
    notFound();
  }

  return (
    <Main className='h-full'>
      <div className='h-full w-full space-y-6 p-10 pb-16'>
        <div className='flex justify-between space-y-0.5'>
          <div>
            <h1 className='font-bold text-2xl tracking-tight'>
              {t_layout('settings')}
            </h1>
            <p className='text-muted-foreground'>
              {t('manageAccountSettings')}
            </p>
          </div>
          <LogoLink
            logoClassName='~h-14/20 ~w-14/20'
            logoOnly
            t={{
              hackerspaceHome: t_layout('hackerspaceHome'),
            }}
          />
        </div>
        <Separator className='my-6' />
        <div className='flex h-full w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <NextIntlClientProvider
            messages={{ settings, ui } as Pick<Messages, 'settings' | 'ui'>}
          >
            <aside className='-mx-4 lg:w-1/5'>
              <SidebarNav />
            </aside>
            <div className='h-full w-full flex-1 lg:max-w-2xl'>{children}</div>
          </NextIntlClientProvider>
        </div>
      </div>
    </Main>
  );
}
