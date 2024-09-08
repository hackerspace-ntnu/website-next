import { IntlErrorProvider } from '@/components/providers/IntlErrorProvider';
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
        <IntlErrorProvider locale={locale}>{children}</IntlErrorProvider>
      </TRPCProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
