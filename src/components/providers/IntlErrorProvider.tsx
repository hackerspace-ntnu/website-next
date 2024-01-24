import { NextIntlClientProvider, useMessages } from 'next-intl';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

function IntlErrorProvider({ children, params: { locale } }: Props) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages.error as Messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}

export { IntlErrorProvider };
