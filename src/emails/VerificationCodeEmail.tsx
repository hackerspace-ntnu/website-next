import { Footer } from '@/components/emails/Footer';
import { Header } from '@/components/emails/Header';
import { Wrapper } from '@/components/emails/Wrapper';
import type { routing } from '@/lib/locale';
import { Section, Text } from '@react-email/components';

export default function VerificationCodeEmail({
  locale = 'en',
  theme = 'dark',
  publicSiteUrl = 'http://localhost:3000',
  validationCode = 'ABCD-EFGH',
}: {
  locale: (typeof routing.locales)[number];
  theme: 'dark' | 'light';
  publicSiteUrl: string;
  validationCode: string;
}) {
  return (
    <Wrapper
      locale={locale}
      theme={theme}
      publicSiteUrl={publicSiteUrl}
      previewText={(() => {
        switch (locale) {
          case 'no':
            return 'Bekreft e-postadressen din';
          default:
            return 'Confirm your email address';
        }
      })()}
    >
      <Header
        title={(() => {
          switch (locale) {
            case 'no':
              return 'Bekreft e-postadressen din';
            default:
              return 'Confirm your email address';
          }
        })()}
        theme={theme}
        publicSiteUrl={publicSiteUrl}
      />
      <Text className='mb-8 text-lg'>
        {(() => {
          switch (locale) {
            case 'no':
              return 'Din bekreftelseskode er nedenfor - skriv den inn i det åpne nettleservinduet ditt, så hjelper vi deg med å logge inn.';
            default:
              return "Your confirmation code is below - enter it in your open browser window and we'll help you get signed in.";
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
      <Text>
        {(() => {
          switch (locale) {
            case 'no':
              return 'Du må bekrefte e-posten din for å opprettholde tilgang til Hackerspace-kontoen din.';
            default:
              return 'You need to confirm you email to keep having access to your Hackerspace Account.';
          }
        })()}
      </Text>
      <Footer publicSiteUrl={publicSiteUrl} locale={locale} theme={theme} />
    </Wrapper>
  );
}
