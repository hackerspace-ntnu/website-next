import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Banner } from '@/components/layout/Banner';
import { LogoLink } from '@/components/layout/LogoLink';
import { Main } from '@/components/layout/Main';
import { SidebarNav } from '@/components/settings/SidebarNav';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { redirect } from '@/lib/locale/navigation';

type SettingsLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
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
  const tLayout = await getTranslations('layout');

  const { user } = await api.auth.state();

  if (!user) {
    return redirect({ href: '/auth', locale });
  }

  const showAdministratorMenu = user.groups.some(
    (group) => group === 'leadership' || group === 'admin',
  );

  return (
    <>
      <Banner />
      <Main className='h-full'>
        <div className='h-full w-full gap-6 p-10 pb-16'>
          <div className='flex gap-3 space-y-0.5'>
            <LogoLink
              logoClassName='clamp-[h-12-16-clamp] clamp-[w-12-16-clamp] min-w-fit'
              logoOnly
              t={{
                hackerspaceHome: tLayout('hackerspaceHome'),
              }}
            />
            <div>
              <h1 className='font-bold text-2xl tracking-tight'>
                {tLayout('settings')}
              </h1>
              <p className='text-muted-foreground'>
                {t('manageAccountSettings')}
              </p>
            </div>
          </div>
          <Separator className='my-6' />
          <div className='flex h-full w-full flex-col gap-8 lg:flex-row'>
            <NextIntlClientProvider
              messages={{ settings, ui } as Pick<Messages, 'settings' | 'ui'>}
            >
              <aside className='-my-2 w-full lg:my-0 lg:w-1/5'>
                <SidebarNav showAdministratorMenu={showAdministratorMenu} />
              </aside>
              <div className='h-full w-full flex-1 lg:max-w-2xl'>
                {children}
              </div>
            </NextIntlClientProvider>
          </div>
        </div>
      </Main>
    </>
  );
}
