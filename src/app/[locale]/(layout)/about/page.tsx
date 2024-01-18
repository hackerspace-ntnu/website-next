import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generatemeta({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('about'),
  };
}

export default function About({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <div>this should be about page</div>;
}
