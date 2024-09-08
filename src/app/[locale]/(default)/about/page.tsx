import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {Button} from 'src/components/ui/Button';
import {Card} from 'src/components/ui/Card';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'layout' });

  return {
    title: t('about'),
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <div>
    <div className='flex flex-col items-center justify-center mt-7 mb-5'>
      <img className='pizzaWolfs'
      src="/about/pizzaWolfs-min.png" 
      alt="pizza wolfs" 
      height={400} 
      width={400} 
      />
    </div>

    <div>
      <p className='text-5xl'>Hva er Hackerspace?</p>

      <p> 
      Hackerspace NTNU er et studentdrevet prosjekt åpent for alle studenter uansett studieretning eller 
      Hackerspace-medlemsskap. Vi tilbyr en kreativ arena der studenter fra forskjellige linjer kan få 
      hjelp til å realisere idéene sine i et engasjert og inkluderende miljø. Hos oss finner du ny 
      teknologi til din disposisjon, blant annet droner, 3D-printere og Virtual Reality-utstyr. 
      </p>
      <p>
      Om du er en førsteklassing som trenger hjelp med ditt første Arduino-prosjekt eller en fjerdeklassing
      som ønsker å lage en 3D-modell av Trondheim, kan vi stille med både utstyr og kompetanse. Vi holder 
      også regelmessig kurs for både nybegynnere og viderekomne innen mange spennende emner.
      </p>
      <p>
      Kom innom for å se hva vi driver med og slå av en prat.
      Du finner oss i andre etasje i A-blokka på Realfagbygget, NTNU Gløshaugen.
      </p>
    </div>
    <div className='flex felx-col items-center justify-center '>
      <Button> Vis kart!</Button>

    </div>
    <div>
      <p className='text-xl'> Oversikt over gruppene </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 content-stretch'>
        <Card > Ledelsen</Card>
        <Card>Tillitsvalg</Card>
        <Card>DevOps</Card>
        <Card>LavOps</Card>
        <Card>Prosjekt: Spill</Card>
        <Card>Prosjekt: Breadboard Computer</Card>
      </div>
    </div>
    
</div>;
}