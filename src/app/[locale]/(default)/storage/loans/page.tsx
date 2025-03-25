import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('storage');

  return {
    title: `${t('title')}: ${t('loans.title')}`,
  };
}

export default async function StorageLoansPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tStorage = await getTranslations('storage');
  const t = await getTranslations('storage.loans');

  return (
    <div className='mx-auto max-w-prose space-y-8'>
      <h1 className='text-center'>
        {tStorage('title')}: {t('title')}
      </h1>
      <h2>{t('titlePending')}</h2>
      <p>Pending loan cards</p>
      <h2>{t('titleAccepted')}</h2>
      <p>Acceptedloan cards</p>
    </div>
  );
}
