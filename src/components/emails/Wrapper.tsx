import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  pixelBasedPreset,
  Tailwind,
} from '@react-email/components';
import type { Locale } from 'next-intl';

function Wrapper({
  children,
  previewText,
  publicSiteUrl,
  locale,
  theme,
}: {
  children: React.ReactNode;
  previewText: string;
  publicSiteUrl: string;
  locale: Locale;
  theme: 'dark' | 'light';
}) {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            fontFamily: {
              inter: [
                'Inter',
                'Arial',
                'Helvetica',
                '-apple-system',
                'BlinkMacSystemFont',
                'sans-serif',
              ],
              montserrat: [
                'Montserrat',
                'Trebuchet MS',
                'Lucida Grande',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
              ],
            },
            colors: {
              border: theme === 'dark' ? '#27272a' : '#e4e4e7',
              input: theme === 'dark' ? '#27272a' : '#e4e4e7',
              ring: theme === 'dark' ? '#15803d' : '#16a34a',
              background: theme === 'dark' ? '#0c0a09' : '#ffffff',
              foreground: theme === 'dark' ? '#f2f2f2' : '#09090b',
              primary: {
                DEFAULT: theme === 'dark' ? '#22c55e' : '#16a34a',
                foreground: theme === 'dark' ? '#052e16' : '#fff1f2',
              },
              secondary: {
                DEFAULT: theme === 'dark' ? '#27272a' : '#f4f4f5',
                foreground: theme === 'dark' ? '#fafafa' : '#18181b',
              },
              destructive: {
                DEFAULT: theme === 'dark' ? '#7f1d1d' : '#ef4444',
                foreground: theme === 'dark' ? '#fef2f2' : '#fafafa',
              },
              muted: {
                DEFAULT: theme === 'dark' ? '#262626' : '#f4f4f5',
                foreground: theme === 'dark' ? '#a1a1aa' : '#71717a',
              },
              accent: {
                DEFAULT: theme === 'dark' ? '#292524' : '#f4f4f5',
                foreground: theme === 'dark' ? '#fafafa' : '#18181b',
              },
              popover: {
                DEFAULT: theme === 'dark' ? '#171717' : '#ffffff',
                foreground: theme === 'dark' ? '#f2f2f2' : '#09090b',
              },
              card: {
                DEFAULT: theme === 'dark' ? '#1c1917' : '#ffffff',
                foreground: theme === 'dark' ? '#f2f2f2' : '#09090b',
              },
            },
          },
        },
      }}
    >
      <Html lang={locale} dir='ltr'>
        <Head>
          <Font
            fontFamily='Inter'
            fallbackFontFamily='Arial'
            webFont={{
              url: `${publicSiteUrl}/static/fonts/inter-regular.woff2`,
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle='normal'
          />
          <Font
            fontFamily='Montserrat'
            fallbackFontFamily={['Helvetica', 'Arial', 'sans-serif']}
            webFont={{
              url: `${publicSiteUrl}/static/fonts/montserrat-semibold.woff2`,
              format: 'woff2',
            }}
            fontWeight={600}
            fontStyle='normal'
          />
        </Head>
        <Preview>{previewText}</Preview>
        <Body className='mx-auto bg-background px-5 font-inter text-foreground'>
          <Container className='mx-auto'>{children}</Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export { Wrapper };
