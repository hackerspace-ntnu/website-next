'use client';

import { useTranslations } from 'next-intl';
import { CoffeeCard } from '@/components/coffee-scanner/CoffeeCard';

type DrinkInfo = {
  imageSource: string;
  displayText: string;
  isChocolate: boolean;
};

function CoffeeActive({
  cardId,
  tooMuchChocolate,
}: {
  cardId: string;
  tooMuchChocolate: boolean;
}) {
  const t = useTranslations('coffeeScanner.drinks');
  const tUi = useTranslations('coffeeScanner.ui');

  const drinks: DrinkInfo[] = [
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('coffee'),
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('coffeeMilk'),
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('cappuccino'),
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('chocolateMilkSpaced'),
      isChocolate: true,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('wienerMelange'),
      isChocolate: true,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('coffeeChocolate'),
      isChocolate: true,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('latteMacchiato'),
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('hotWater'),
      isChocolate: false,
    },
  ];

  return (
    <div className='flex h-full flex-col justify-end'>
      <div className='m-10 flex-1'>
        <div>
          <h1 className='text-7xl'>{tUi('welcome')}</h1>
          <p className='pl-4 text-2xl'>
            {tUi('yourCardId')}: {cardId}
          </p>
        </div>
        {/* TODO: Add statistics */}
      </div>
      <div className='flex flex-col justify-center align-bottom'>
        <p className='mt-10 mr-45 mb-0 ml-45 text-center font-extrabold text-[28px] uppercase'>
          {tUi('selectADrink')}
        </p>
        <div className='m-10 grid grid-cols-4 grid-rows-2 gap-6'>
          {drinks.map((drinkInfo) => (
            <CoffeeCard
              data={drinkInfo}
              tooMuchChocolate={tooMuchChocolate}
              className='h-[150px] text-center'
              key={drinkInfo.displayText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { CoffeeActive, type DrinkInfo };
