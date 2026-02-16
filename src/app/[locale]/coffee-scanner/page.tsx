import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { CoffeeActive } from '@/components/coffee-scanner/CoffeeActive';
// import { CoffeeIdle } from '@/components/coffee-scanner/CoffeeIdle';
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

  return (
    <main className='absolute top-0 left-0 h-full w-full'>
      <NextIntlClientProvider
        messages={{ coffeeScanner } as Pick<Messages, 'coffeeScanner'>}
      >
        {/* <CoffeeIdle /> */}
        <CoffeeActive cardId={''} tooMuchChocolate={false} />
      </NextIntlClientProvider>
    </main>
  );
}
