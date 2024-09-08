import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {Button} from 'src/components/ui/Button'

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
    <p className='text-5xl'> Leaderboard </p>
    <p> Ledelsen består av Leder, Nestleder og Økonomiansvarlig i Hackerspace. 
        Disse sørger for at Hackerspace NTNU driftes optimalt og gjennomfører avgjørelser og 
        planlegging av drift med styret.</p>
    <Button> leader </Button> {/*add a way to connect leader with their profile*/}
    <Button> secound in commans </Button>
    <Button> financial manager </Button>
    <Button> Medlemmer og info </Button>
    </div>;
}