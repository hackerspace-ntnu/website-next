import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BackToStorageButton } from '@/components/storage/BackToStorageButton';

type LoansLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function UserLoansLayout({
  params,
  children,
}: LoansLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('storage');
  const tLoans = await getTranslations('storage.loans');

  return (
    <>
      <BackToStorageButton />
      <div className='relative mb-8 flex items-center justify-between'>
        <h1 className='mx-auto text-center'>
          {t('title')}: {tLoans('title')}
        </h1>
      </div>
      {children}
    </>
  );
}
