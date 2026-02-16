'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatedCoffeeScannerSVG } from '@/components/assets/CoffeeScannerSVG';
import { HackerspaceLogo } from '@/components/assets/logos';
import { CoffeeCard } from '@/components/coffee-scanner/CoffeeCard';
import { api } from '@/lib/api/client';

// 'kaffe',
// 'kaffe_melk',
// 'cappuccino',
// 'sjokolademelk',
// 'wiener_melange',
// 'kaffe_sjoko',
// 'latte_macchiato',
// 'varmt_vann',

export default function CoffeePage() {
  const [currentCardId, setCardId] = useState<string>('');
  const [tooMuchChocolate, setTooMuchChocolate] = useState<boolean>(false);
  const coffeeClassName = 'text-center h-[150px]';

  api.coffeeScanner.scan.useSubscription(undefined, {
    onData: (data) => {
      setCardId(data);

      const timeout = setTimeout(() => setCardId(''), 10);
      return clearTimeout(timeout);
    },
  });

  api.coffeeScanner.tooMuchChocolate.useSubscription(undefined, {
    onData: (data) => {
      setTooMuchChocolate(data);
    },
  });

  useEffect(() => {
    if (currentCardId !== '') {
      // const timeout = setTimeout(() => setCardId(''), 50000); // 5 Minutes
      // return () => clearTimeout(timeout);
    }
  }, [currentCardId]);

  if (currentCardId === '') {
    return (
      <main className='absolute top-0 left-0 h-full w-full'>
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-2/12 left-1/2 w-max max-w-9/10 text-center font-extrabold text-7xl'>
          Want some{' '}
          <span className='relative inline-block text-[#5E3023]'>
            coffee?
            <span
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(110deg,transparent_42%,#EBBE9Bcc_45%,#F5F9E9cc_50%,#EBBE9Bcc_55%,transparent_58%)] bg-clip-text text-transparent'
            >
              coffee?
            </span>
          </span>
        </h1>
        <h1 className='-translate-x-1/2 -translate-y-1/2 absolute top-5/12 left-1/2 w-max max-w-9/10 text-center font-normal text-6xl'>
          Scan your <span className='font-extrabold'>student card</span> before{' '}
          grabbing a drink
        </h1>
        <AnimatedCoffeeScannerSVG className='-translate-x-1/2 -translate-y-1/2 absolute top-16/20 left-12/20 h-60 w-100' />
        <div className='absolute bottom-10 left-10 flex flex-row items-center gap-2 text-lg'>
          <span className='font-montserrat'>PROVIDED BY</span>
          <div className='flex flex-row items-center'>
            <HackerspaceLogo className='h-6 w-6' />
            <span className='font-bold font-montserrat'> HACKERSPACE</span>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className='absolute top-0 left-0 h-full w-full'>
      {/* <div>This is the current id: {currentCardId}</div>
      {tooMuchChocolate && (
        <div>This user has taken too much chocolate. SHAME ON YOU!</div>
      )} */}
      <div className='relative h-[250px]'>
        <h1 className='relative top-[70%] z-20 text-center'>
          Choose which drink you want today
        </h1>
        <div className='absolute top-0 z-10 h-full w-full bg-gradient-to-t from-[var(--background)] to-transparent' />
        <div className='absolute top-0 z-10 h-full w-full bg-[linear-gradient(90deg,var(--background),transparent_30%)]' />
        <div className='absolute top-0 z-10 h-full w-full bg-[linear-gradient(270deg,var(--background),transparent_30%)]' />
        <Image
          src={'/drinks/relax_cat.webp'}
          alt={'cat'}
          fill
          className='absolute h-full w-full object-cover object-[center_28%]'
        />
      </div>
      <div className='m-4 grid grid-cols-4 grid-rows-2 gap-5'>
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'KAFFE'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'KAFFE MELK'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'CAPPUCCINO'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'SJOKOLADE\nMELK'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'WIENER MELANGE'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'KAFFE SJOKO'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'LATTE MACCHIATO'}
          className={coffeeClassName}
        />
        <CoffeeCard
          imgSource={'yomama'}
          drinkType={'VARMT VANN'}
          className={coffeeClassName}
        />
      </div>
    </main>
  );
}
