import { MembersSearchBar } from '@/components/members/MembersSearchBar';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type MemberHeaderLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function MembersLayout({
  children,
  params,
}: MemberHeaderLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);
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
