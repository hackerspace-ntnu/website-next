import { IntlClientProvider } from '@/components/providers/IntlClientProvider';
import { NuqsProvider } from '@/components/providers/NuqsProvider';
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
        <NuqsProvider>
          <IntlClientProvider locale={locale}>{children}</IntlClientProvider>
        </NuqsProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
