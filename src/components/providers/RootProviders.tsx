import { IntlClientProvider } from '@/components/providers/IntlClientProvider';
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider';
import { NuqsProvider } from '@/components/providers/NuqsProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
// import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { TRPCProvider } from '@/components/providers/TRPCProvider';

type RootProvidersProps = {
  children: React.ReactNode;
  locale: string;
};

function RootProviders({ children, locale }: RootProvidersProps) {
  return (
    <ThemeProvider>
      <IntlClientProvider locale={locale}>
        <TRPCProvider>
          <NuqsProvider>
            <LazyMotionProvider>
              {/* Commented out until api key and cookie banner is fixed */}
              {/*<PostHogProvider>*/}
              {children}
              {/*</PostHogProvider>*/}
            </LazyMotionProvider>
          </NuqsProvider>
        </TRPCProvider>
      </IntlClientProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
