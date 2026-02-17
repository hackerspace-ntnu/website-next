'use client';

import { useTranslations } from 'next-intl';
import { AnimatedCoffeeScannerSVG } from '@/components/assets/CoffeeScannerSVG';
import { HackerspaceLogo } from '@/components/assets/logos';
import { ShimmerText } from '@/components/coffee-scanner/ShimmerText';

function CoffeeIdle() {
  const t = useTranslations('coffeeScanner');
  return (
    <>
      <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-2/12 left-1/2 w-max max-w-9/10 text-center font-extrabold text-7xl'>
        {t('ui.wantSome')}{' '}
        <ShimmerText
          text={t('drinks.coffee')}
          textColor={'#5E3023'}
          gradientColor={'#EBBE9B'}
          highlightColor={'#F5F9E9'}
          className='lowercase'
        />
        ?
      </h1>
      <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-5/12 left-1/2 w-max max-w-9/10 text-center font-normal text-6xl'>
        {t('ui.scanYour')}{' '}
        <span className='font-extrabold'>{t('ui.studentCard')}</span>{' '}
        {t('ui.grabDrink')}
      </h1>
      <AnimatedCoffeeScannerSVG className='-translate-x-1/2 -translate-y-1/2 absolute top-16/20 left-1/2 h-60 w-100' />
      <div className='absolute bottom-10 left-10 flex flex-row items-center gap-2 text-lg'>
        <span className='font-montserrat uppercase'>{t('ui.providedBy')}</span>
        <div className='flex flex-row items-center'>
          <HackerspaceLogo className='h-6 w-6' />
          <span className='font-bold font-montserrat'> HACKERSPACE</span>
        </div>
      </div>
    </>
  );
}

export { CoffeeIdle };
