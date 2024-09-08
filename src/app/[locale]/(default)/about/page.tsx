import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {Button} from 'src/components/ui/Button';
import Link from 'next/link'
import React from 'react'


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
      <p className='text-xl'> Våre aktive grupper </p>
      <Link href="/leaderboard" passHref>
        <Button>
          Ledelsen
        </Button>
      </Link>
    </div>
    
</div>;
}