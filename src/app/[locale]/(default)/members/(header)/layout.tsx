import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { SearchBar } from '@/components/composites/SearchBar';

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
      <div className='flex items-center justify-between'>
        <h1 className='my-4'>{t('title')}</h1>
        <SearchBar
          className='mt-5 mr-10 lg:max-w-full'
          placeholder={t('searchPlaceholder')}
        />
      </div>
      {children}
    </>
  );
}
