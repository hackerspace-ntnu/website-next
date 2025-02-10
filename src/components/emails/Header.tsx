import { Column, Heading, Img, Row, Section } from '@react-email/components';

function Header({
  title,
  publicSiteUrl,
}: { title: string; publicSiteUrl: string }) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Img
              src={`${publicSiteUrl}/static/logo.svg`}
              width='64'
              height='64'
              alt='Hackerspace NTNU'
            />
          </Column>
          <Column>
            <p className='font-bold text-lg'>Hackerspace NTNU</p>
          </Column>
        </Row>
      </Section>
      <Heading>{title}</Heading>
    </>
  );
}

export { Header };
