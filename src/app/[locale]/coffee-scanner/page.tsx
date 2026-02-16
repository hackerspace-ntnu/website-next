import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { CoffeeIdle } from '@/components/coffee-scanner/CoffeeIdle';
// import { AnimatedCoffeeScannerSVG } from '@/components/assets/CoffeeScannerSVG';
// import { HackerspaceLogo } from '@/components/assets/logos';
// import { CoffeeCard } from '@/components/coffee-scanner/CoffeeCard';
// import { api } from '@/lib/api/client';

// type DrinkInfo = {
//   imageSource: string;
//   displayText: string;
// };

export default async function CoffeePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { coffeeScanner } = await getMessages();
  // // const [currentCardId, setCardId] = useState<string>('');
  // // const [tooMuchChocolate, setTooMuchChocolate] = useState<boolean>(false);
  // const drinkInfoArray: DrinkInfo[] = [
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('coffee')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('coffeeMilk')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('cappuccino')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('chocolateMilkSpaced')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('wienerMelange')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('coffeeChocolate')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('latteMacchiato')},
  //   { imageSource: '/drinks/relax_cat.webp', displayText: t('hotWater')},
  // ];

  // let cardId = api.coffeeScanner.scan.useSubscription(undefined, {
  //   onData: (data) => {
  //     return data;
  //   },
  // });

  // let tooMuchChocolate = api.coffeeScanner.tooMuchChocolate.useSubscription(undefined, {
  //   onData: (data) => {
  //     return data;
  //   },
  // });

  // // useEffect(() => {
  // //   if (currentCardId !== '') {
  // //     // const timeout = setTimeout(() => setCardId(''), 50000); // 5 Minutes
  // //     // return () => clearTimeout(timeout);
  // //   }
  // // }, [currentCardId]);

  // if (cardId.data === '') {
  // return (
  //   <main className='absolute top-0 left-0 h-full w-full'>
  //     {/* <div>This is the current id: {currentCardId}</div>
  //     {tooMuchChocolate && (
  //       <div>This user has taken too much chocolate. SHAME ON YOU!</div>
  //     )} */}
  //     <div className='m-4 grid grid-cols-4 grid-rows-2 gap-5'>
  //       {drinkInfoArray.map((drinkInfo, _index) => (
  //         <CoffeeCard
  //           imgSource={drinkInfo.imageSource}
  //           drinkType={drinkInfo.displayText}
  //           className='text-center h-[150px]'
  //         />
  //       ))}
  //     </div>
  //   </main>
  // );
  return (
    <main className='absolute top-0 left-0 h-full w-full'>
      <NextIntlClientProvider
        messages={{ coffeeScanner } as Pick<Messages, 'coffeeScanner'>}
      >
        <CoffeeIdle />
      </NextIntlClientProvider>
    </main>
  );
}
