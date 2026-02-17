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
  const tApi = useTranslations('coffeeScanner.api');

  const drinks: DrinkInfo[] = [
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('coffee'),
      drinkType: 'coffee',
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('coffeeMilk'),
      drinkType: 'coffee_milk',
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('cappuccino'),
      drinkType: 'cappuccino',
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('chocolateMilkSpaced'),
      drinkType: 'chocolate_milk',
      isChocolate: true,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('wienerMelange'),
      drinkType: 'wiener_melange',
      isChocolate: true,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('coffeeChocolate'),
      drinkType: 'coffee_chocolate',
      isChocolate: true,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('latteMacchiato'),
      drinkType: 'latte_macchiato',
      isChocolate: false,
    },
    {
      imageSource: '/drinks/relax_cat.webp',
      displayText: t('hotWater'),
      drinkType: 'hot_water',
      isChocolate: false,
    },
  ];

  const addCoffeeEntry = api.coffeeScanner.addCoffeeEntry.useMutation({
    onSuccess: () => {
      toast.success(tApi('addEntrySuccess'));
    },
  });

  const sendEntry = (
    drinkType: (typeof drinkTypes)[number],
    isChocolate: boolean,
  ) => {
    addCoffeeEntry.mutate({
      drinkType,
      isChocolate,
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
