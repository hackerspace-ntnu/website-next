import { Header } from '@/components/emails/Header';
import { Wrapper } from '@/components/emails/Wrapper';
import type { routing } from '@/lib/locale';
import { Button, Text } from '@react-email/components';

export default function VerificationCodeEmail({
  locale = 'en',
  theme = 'dark',
  publicSiteUrl = 'http://localhost:3000',
}: {
  locale: (typeof routing.locales)[number];
  theme: 'dark' | 'light';
  publicSiteUrl: string;
}) {
  return (
    <Wrapper
      locale={locale}
      theme={theme}
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
        publicSiteUrl={publicSiteUrl}
      />
      <Text>
        {(() => {
          switch (locale) {
            case 'no':
              return 'Din bekreftelseskode er nedenfor - skriv den inn i det åpne nettleservinduet ditt, så hjelper vi deg med å logge inn.';
            default:
              return "Your confirmation code is below - enter it in your open browser window and we'll help you get signed in.";
          }
        })()}
      </Text>
      <Button className='rounded-lg bg-primary px-4 py-2 text-primary-foreground'>
        Click me
      </Button>
    </Wrapper>
  );
}
