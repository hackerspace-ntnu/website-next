import type { routing } from '@/lib/locale';
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';

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
  locale: (typeof routing.locales)[number];
  theme: 'dark' | 'light';
}) {
  return (
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
      <Tailwind
        config={{
          theme: {
            fontSize: {
              xs: ['12px', { lineHeight: '16px' }],
              sm: ['14px', { lineHeight: '20px' }],
              base: ['16px', { lineHeight: '24px' }],
              lg: ['18px', { lineHeight: '28px' }],
              xl: ['20px', { lineHeight: '28px' }],
              '2xl': ['24px', { lineHeight: '32px' }],
              '3xl': ['30px', { lineHeight: '36px' }],
              '4xl': ['36px', { lineHeight: '36px' }],
              '5xl': ['48px', { lineHeight: '1' }],
              '6xl': ['60px', { lineHeight: '1' }],
              '7xl': ['72px', { lineHeight: '1' }],
              '8xl': ['96px', { lineHeight: '1' }],
              '9xl': ['144px', { lineHeight: '1' }],
            },
            spacing: {
              px: '1px',
              0: '0',
              0.5: '2px',
              1: '4px',
              1.5: '6px',
              2: '8px',
              2.5: '10px',
              3: '12px',
              3.5: '14px',
              4: '16px',
              5: '20px',
              6: '24px',
              7: '28px',
              8: '32px',
              9: '36px',
              10: '40px',
              11: '44px',
              12: '48px',
              14: '56px',
              16: '64px',
              20: '80px',
              24: '96px',
              28: '112px',
              32: '128px',
              36: '144px',
              40: '160px',
              44: '176px',
              48: '192px',
              52: '208px',
              56: '224px',
              60: '240px',
              64: '256px',
              72: '288px',
              80: '320px',
              96: '384px',
            },
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
              borderRadius: {
                lg: '5px',
                md: '3px',
                sm: '1px',
              },
            },
          },
        }}
      >
        <Body className='mx-auto bg-background px-5 font-inter text-foreground'>
          <Container className='mx-auto'>{children}</Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export { Wrapper };
