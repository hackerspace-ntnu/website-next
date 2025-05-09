import type { routing } from '@/lib/locale';
import { Container, Img, Link, Text } from '@react-email/components';

function Footer({
  publicSiteUrl,
  locale,
  theme,
}: {
  publicSiteUrl: string;
  locale: (typeof routing.locales)[number];
  theme: 'dark' | 'light';
}) {
  return (
    <>
      <Container className='mt-8'>
        <Link
          href={(() => {
            switch (locale) {
              case 'nb-NO':
                return 'https://www.ntnu.no/idi';
              default:
                return 'https://www.ntnu.edu/idi';
            }
          })()}
        >
          <Img
            className='mx-auto mt-4'
            src={`${publicSiteUrl}/static/images/${theme === 'dark' ? 'idi-dark.svg' : 'idi-light.svg'}`}
            width='217'
            height='64'
            alt={(() => {
              switch (locale) {
                case 'nb-NO':
                  return 'NTNU Institutt for datateknologi og informatikk';
                default:
                  return 'NTNU Department of Computer Science';
              }
            })()}
          />
        </Link>
        <Link href='https://www.ntnu.no/ie/nexus/'>
          <Img
            className='mx-auto mt-4'
            src={`${publicSiteUrl}/static/images/nexus.svg`}
            width='193'
            height='64'
            alt={(() => {
              switch (locale) {
                case 'nb-NO':
                  return 'Arbeidslivsnettverket Nexus';
                default:
                  return 'The working life network Nexus';
              }
            })()}
          />
        </Link>
      </Container>
      <Text className='text-center text-xs'>
        {(() => {
          switch (locale) {
            case 'nb-NO':
              return 'Åpningstider';
            default:
              return 'Opening hours';
          }
        })()}:
        <br />
        {(() => {
          switch (locale) {
            case 'nb-NO':
              return 'Mandag-Fredag';
            default:
              return 'Monday-Friday';
          }
        })()}, 10:15-18:00
      </Text>
      <Text className='ml-1 text-center text-xs opacity-75'>
        <Link
          className='text-primary underline'
          href='https://use.mazemap.com/#v=1&zlevel=2&center=10.404406,63.415418&zoom=18&sharepoitype=poi&sharepoi=1000391296&campusid=1'
        >
          Realfagbygget, A-blokka
        </Link>
        <br />
        Høgskoleringen 5
        <br />
        7034 Trondheim
      </Text>
    </>
  );
}

export { Footer };
