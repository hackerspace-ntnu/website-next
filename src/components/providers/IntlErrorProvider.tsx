import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  locale: string;
};

function IntlErrorProvider({ children, locale }: Props) {
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
