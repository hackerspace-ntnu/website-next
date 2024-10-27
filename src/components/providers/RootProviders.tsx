import { IntlClientProvider } from '@/components/providers/IntlClientProvider';
import { TRPCProvider } from '@/components/providers/TRPCProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

type RootProvidersProps = {
  children: React.ReactNode;
  locale: string;
};

function RootProviders({ children, locale }: RootProvidersProps) {
  return (
    <ThemeProvider>
      <TRPCProvider>
        <IntlClientProvider locale={locale}>{children}</IntlClientProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
