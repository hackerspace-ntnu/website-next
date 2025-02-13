import {
  Column,
  Heading,
  Img,
  Link,
  Row,
  Section,
} from '@react-email/components';

function Header({
  title,
  publicSiteUrl,
}: { title: string; publicSiteUrl: string }) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Link href='https://beta.hackerspace-ntnu.no'>
              <Img
                src={`${publicSiteUrl}/static/images/logo.svg`}
                width='64'
                height='64'
                alt='Hackerspace NTNU'
              />
            </Link>
          </Column>
          <Column>
            <span className='font-montserrat font-semibold text-xl'>
              HACKERSPACE NTNU
            </span>
          </Column>
        </Row>
      </Section>
      <Heading>{title}</Heading>
    </>
  );
}

export { Header };
