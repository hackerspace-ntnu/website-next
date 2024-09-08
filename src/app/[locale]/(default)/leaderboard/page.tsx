import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('leaderboard'),
  };
}

export default function LeaderboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <div>
    leaderboard
    </div>;
}