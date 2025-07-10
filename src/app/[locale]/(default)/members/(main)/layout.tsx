import { SearchBar } from '@/components/composites/SearchBar';
import { MembersSearchBar } from '@/components/members/MembersSearchBar';
import { type Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type MemberHeaderLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default function MemberHeaderLayout({
  children,
  params: { locale },
}: MemberHeaderLayoutProps) {
  setRequestLocale(locale);
  const t = useTranslations('members');
  const tUi = useTranslations('ui');

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
