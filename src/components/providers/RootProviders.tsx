import { IntlErrorProvider } from '@/components/providers/IntlErrorProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

type RootProvidersProps = {
  children: React.ReactNode;
  locale: string;
};

function RootProviders({ children, locale }: RootProvidersProps) {
  return (
    <ThemeProvider>
      <IntlErrorProvider locale={locale}>{children}</IntlErrorProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
