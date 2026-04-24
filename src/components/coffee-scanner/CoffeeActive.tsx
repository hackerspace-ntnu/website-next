'use client';

import { useTranslations } from 'next-intl';
import { CoffeeCard } from '@/components/coffee-scanner/CoffeeCard';
import { toast } from '@/components/ui/Toaster';
import { api } from '@/lib/api/client';
import type { drinkTypes } from '@/lib/constants';

type DrinkInfo = {
  imageSource: string;
  displayText: string;
  drinkType: (typeof drinkTypes)[number];
};

function CoffeeActive({
  cardId,
  tooMuchChocolate,
  onComplete,
}: {
  cardId: string;
  tooMuchChocolate: boolean;
  onComplete: () => void;
}) {
  const t = useTranslations('coffeeScanner.drinks');
  const tUi = useTranslations('coffeeScanner.ui');
  const tApi = useTranslations('coffeeScanner.api');

  const drinks: DrinkInfo[] = [
    {
      imageSource: '/drinks/coffee.png',
      displayText: t('coffee'),
      drinkType: 'coffee',
    },
    {
      imageSource: '/drinks/coffee-milk.png',
      displayText: t('coffeeMilk'),
      drinkType: 'coffee_milk',
    },
    {
      imageSource: '/drinks/cappuccino.png',
      displayText: t('cappuccino'),
      drinkType: 'cappuccino',
    },
    {
      imageSource: '/drinks/choccy-milk.png',
      displayText: t('chocolateMilkSpaced'),
      drinkType: 'chocolate_milk',
    },
    {
      imageSource: '/drinks/wiener-melange.png',
      displayText: t('wienerMelange'),
      drinkType: 'wiener_melange',
    },
    {
      imageSource: '/drinks/coffee-choco.png',
      displayText: t('coffeeChocolate'),
      drinkType: 'coffee_chocolate',
    },
    {
      imageSource: '/drinks/latte-mach.png',
      displayText: t('latteMacchiato'),
      drinkType: 'latte_macchiato',
    },
    {
      imageSource: '/drinks/hot-water.png',
      displayText: t('hotWater'),
      drinkType: 'hot_water',
    },
  ];

  const addCoffeeEntry = api.coffeeScanner.addCoffeeEntry.useMutation({
    onSuccess: () => {
      toast.success(tApi('addEntrySuccess'));
      onComplete();
    },
  });

  const sendEntry = (drinkType: (typeof drinkTypes)[number]) => {
    addCoffeeEntry.mutate({
      drinkType,
      cardId,
    });
  };

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
              className='h-40 text-center'
              onClick={sendEntry}
              key={drinkInfo.displayText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { CoffeeActive, type DrinkInfo };
