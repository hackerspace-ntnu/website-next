import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { CoffeeSSE } from '@/components/coffee-scanner/CoffeeSSE';

export default async function CoffeePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const { coffeeScanner } = await getMessages();

  return (
    <main className='absolute top-0 left-0 h-full w-full'>
      <NextIntlClientProvider
        messages={{ coffeeScanner } as Pick<Messages, 'coffeeScanner'>}
      >
        <CoffeeSSE />
      </NextIntlClientProvider>
    </main>
  );
}
