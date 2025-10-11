import { Section, Text } from '@react-email/components';
import type { Locale } from 'next-intl';
import { Footer } from '@/components/emails/Footer';
import { Header } from '@/components/emails/Header';
import { Wrapper } from '@/components/emails/Wrapper';
import { routing } from '@/lib/locale';

// Using default export to support React Email Dev Preview
export default function ForgotPasswordEmail({
  locale = routing.defaultLocale,
  theme = 'dark',
  publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  validationCode = 'ABCDEFGH',
}: {
  locale: Locale;
  theme: 'dark' | 'light';
  publicSiteUrl?: string;
  validationCode: string;
}) {
  return (
    <Wrapper
      locale={locale}
      theme={theme}
      publicSiteUrl={publicSiteUrl}
      previewText={(() => {
        switch (locale) {
          case 'nb-NO':
            return 'Gjenopprett tilgang til kontoen din';
          default:
            return 'Recover access to your account';
        }
      })()}
    >
      <Header
        title={(() => {
          switch (locale) {
            case 'nb-NO':
              return 'Gjenopprett tilgang til Hackerspace-kontoen din';
            default:
              return 'Recover access to your Hackerspace Account';
          }
        })()}
        theme={theme}
        publicSiteUrl={publicSiteUrl}
      />
      <Text className='mb-8 text-lg'>
        {(() => {
          switch (locale) {
            case 'nb-NO':
              return 'Din bekreftelseskode er nedenfor - skriv den inn på nettsiden vår for å endre passordet ditt. Hold den hemmelig.';
            default:
              return 'Your confirmation code is below - enter it on our website to reset your password. Keep it secret.';
          }
        })()}
      </Text>
      <Section className='mb-8 rounded-lg bg-muted px-2.5 py-10'>
        <Text className='text-center align-middle font-montserrat text-3xl'>
          {validationCode.substring(0, 4)}
          <span className='select-none'>-</span>
          {validationCode.substring(4)}
        </Text>
      </Section>
      <Text className='mb-8'>
        {(() => {
          switch (locale) {
            case 'nb-NO':
              return 'Har du ikke bedt om å tilbakestille passordet ditt? Se bort fra denne e-posten og ikke oppgi koden din til noen.';
            default:
              return 'If you did not request a password reset, please ignore this email and do not share your code with anyone.';
          }
        })()}
      </Text>
      <Footer publicSiteUrl={publicSiteUrl} locale={locale} theme={theme} />
    </Wrapper>
  );
}
