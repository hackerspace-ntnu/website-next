import { NextIntlClientProvider, useMessages } from 'next-intl';

type Props = {
  children: React.ReactNode;
  locale: string;
};

function IntlClientProvider({ children, locale }: Props) {
  const { ui, error } = useMessages();
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={{ ui, error } as Pick<Messages, 'ui' | 'error'>}
    >
      {children}
    </NextIntlClientProvider>
  );
}

export { IntlClientProvider };
