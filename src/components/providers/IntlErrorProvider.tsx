import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  locale: string;
};

function IntlErrorProvider({ children, locale }: Props) {
  const { error } = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={{ error } as Messages}>
      {children}
    </NextIntlClientProvider>
  );
}

export { IntlErrorProvider };
