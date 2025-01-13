import { SearchBar } from '@/components/composites/SearchBar';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type MemberHeaderLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function MemberHeaderLayout({
  children,
  params: { locale },
}: MemberHeaderLayoutProps) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('members');
  return (
    <>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <div className='my-4 flex flex-col justify-center gap-2 lg:flex-row'>
        <SearchBar
          className='lg:max-w-2xl'
          placeholder={t('searchPlaceholder')}
        />
      </div>
      {children}
    </>
  );
}
