'use client';

import { useTranslations } from 'next-intl';

function CoffeeFinished() {
  const t = useTranslations('coffeeScanner.ui');
  return (
    <div className='flex h-full w-full flex-col items-center justify-center text-center'>
      <h1 className='font-black text-8xl'>{t('thankYou')}</h1>
      <p className='pt-4 font-medium text-2xl'>{t('thankYouDrink')}</p>
    </div>
  );
}

export { CoffeeFinished };
