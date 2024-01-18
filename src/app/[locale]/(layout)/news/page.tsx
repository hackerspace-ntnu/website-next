import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generatemeta({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('news'),
  };
}

export default function News({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <div>this should be news page</div>;
}
