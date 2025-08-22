import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MembersSearchBar } from '@/components/members/MembersSearchBar';

export default async function MembersLayout({
  children,
  params,
}: LayoutProps<'/[locale]/members'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('members');
  const tUi = await getTranslations('ui');

  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <div className='my-4 flex flex-col justify-center gap-2 lg:flex-row'>
        <MembersSearchBar
          placeholder={t('searchPlaceholder')}
          t={{ name: tUi('name') }}
        />
      </div>
      {children}
    </>
  );
}
