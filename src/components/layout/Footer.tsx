import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  SlackIcon,
} from '@/components/assets/icons';
import { IDILogo, NexusLogo } from '@/components/assets/logos';
import { LogoLink } from '@/components/layout/LogoLink';
import { Nav } from '@/components/layout/header/Nav';
import { ExternalLink, Link } from '@/components/ui/Link';
import { BugIcon, MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

function Footer() {
  const t = useTranslations('layout');
  const year = new Date().getFullYear();
  return (
    <footer className='mx-auto w-full max-w-screen-2xl border-border/40 border-t bg-background/95 px-11 py-10 text-sm md:px-16 lg:px-24'>
      <div className='grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4'>
        <div>
          <div className='flex'>
            <LogoLink
              className='justify-start'
              titleClassName='text-lg'
              t={{
                hackerspaceHome: t('hackerspaceHome'),
              }}
            />
          </div>
          <p className='ml-2 leading-tight'>
            <strong>{t('openingHours')}:</strong>
            <br />
            <span>{t('allWeekdays')}, 10:15-18:00</span>
            <br />
            <br />
            <ExternalLink
              href='https://use.mazemap.com/#v=1&zlevel=2&center=10.404406,63.415418&zoom=18&sharepoitype=poi&sharepoi=1000391296&campusid=1'
              prefetch={false}
              target='_blank'
              rel='noopener noreferrer'
            >
              Realfagbygget, A-blokka
            </ExternalLink>
            <br />
            Høgskoleringen 5<br />
            7034 Trondheim
          </p>
        </div>
        <div>
          <h4>{t('socialMedia')}</h4>
          <ul className='grid grid-flow-row grid-cols-2-auto justify-start text-foreground/80 sm:grid-cols-3-auto xl:grid-flow-col xl:grid-cols-none'>
            <li>
              <ExternalLink
                variant='ghost'
                size='sm-icon'
                href='mailto:hackerspace-styret@idi.ntnu.no'
                aria-label={t('sendAnEmail')}
              >
                <MailIcon className='h-4 w-4' />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                variant='ghost'
                size='sm-icon'
                href='https://hackerspace-ntnu.slack.com/'
                prefetch={false}
                aria-label={t('visitSlack')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <SlackIcon className='h-4 w-4' />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                variant='ghost'
                size='sm-icon'
                href='https://www.facebook.com/hackerspacentnu'
                prefetch={false}
                aria-label={t('visitFacebook')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookIcon className='h-4 w-4' />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                variant='ghost'
                size='sm-icon'
                href='https://github.com/hackerspace-ntnu/'
                prefetch={false}
                aria-label={t('visitGithub')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <GitHubIcon className='h-4 w-4' />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                variant='ghost'
                size='sm-icon'
                href='https://www.instagram.com/hackerspacentnu/'
                prefetch={false}
                aria-label={t('visitInstagram')}
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramIcon className='h-4 w-4' />
              </ExternalLink>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t('links')}</h4>
          <Nav
            className='mt-2 ml-2 flex flex-col items-start gap-1.5'
            t={{
              news: t('news'),
              events: t('events'),
              about: t('about'),
            }}
          />
        </div>
        <div>
          <h4>{t('utilities')}</h4>
          <p className='ml-2 [&:not(:first-child)]:mt-0'>
            <Link variant='link' href='/'>
              {t('signIn')}
            </Link>
            <br />
            {t('haveYouFoundA')} <BugIcon className='inline h-4 w-4' />?
            <br />
            {t.rich('utilitiesDescription', {
              code: (children) => (
                <code className='inline-block text-xs'>{children}</code>
              ),
              MailLink: () => (
                <ExternalLink
                  className='inline'
                  href='mailto:hackerspace-dev@idi.ntnu.no'
                  aria-label={t('sendAnEmail')}
                >
                  <MailIcon className='inline h-4 w-4' />
                </ExternalLink>
              ),
              SlackLink: (children) => (
                <ExternalLink
                  className='inline'
                  href='https://hackerspace-ntnu.slack.com/archives/CDK99FYTY'
                  prefetch={false}
                  aria-label={t('visitSlack')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {children}
                </ExternalLink>
              ),
              GithubLink: (children) => (
                <ExternalLink
                  className='inline'
                  href='https://github.com/hackerspace-ntnu/website-frontend/issues'
                  prefetch={false}
                  aria-label={t('visitGithub')}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {children}
                </ExternalLink>
              ),
            })}
          </p>
        </div>
      </div>
      <nav className='py-20'>
        <ul className='flex flex-col justify-center gap-6 sm:flex-row md:gap-10 lg:gap-20 xl:gap-40'>
          <li>
            <ExternalLink
              variant='none'
              href={t('NTNUIDIURL')}
              prefetch={false}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('NTNUIDI')}
              title={t('NTNUIDI')}
            >
              <IDILogo className='p-6' />
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              variant='none'
              href='https://www.ntnu.no/ie/nexus/'
              prefetch={false}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={t('NTNUNexus')}
              title={t('NTNUNexus')}
            >
              <NexusLogo className='p-6' />
            </ExternalLink>
          </li>
        </ul>
      </nav>
      <p className='text-center'>
        {t('copyright')} &copy; {year}, Hackerspace NTNU.{' '}
        {t('allRightsReserved')}.
      </p>
    </footer>
  );
}

export { Footer };
