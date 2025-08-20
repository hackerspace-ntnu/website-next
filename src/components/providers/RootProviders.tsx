import type { Locale } from 'next-intl';
import { IntlClientProvider } from '@/components/providers/IntlClientProvider';
import { LazyMotionProvider } from '@/components/providers/LazyMotionProvider';
import { NuqsProvider } from '@/components/providers/NuqsProvider';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { TRPCProvider } from '@/components/providers/TRPCProvider';

type RootProvidersProps = {
  children: React.ReactNode;
  locale: Locale;
};

function RootProviders({ children, locale }: RootProvidersProps) {
  return (
    <ThemeProvider>
      <IntlClientProvider locale={locale}>
        <TRPCProvider>
          <NuqsProvider>
            <LazyMotionProvider>
              <PostHogProvider>{children}</PostHogProvider>
            </LazyMotionProvider>
          </NuqsProvider>
        </TRPCProvider>
      </IntlClientProvider>
    </ThemeProvider>
  );
}

export { RootProviders };
