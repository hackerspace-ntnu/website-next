import { Bug, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ExternalLink from 'next/link';

import { Link } from '@/lib/navigation';

import { Facebook } from '@/components/assets/icons/Facebook';
import { Github } from '@/components/assets/icons/Github';
import { Instagram } from '@/components/assets/icons/Instagram';
import { Slack } from '@/components/assets/icons/Slack';
import { IDILogo } from '@/components/assets/sponsors/IDILogo';
import { KiDLogo } from '@/components/assets/sponsors/KiDLogo';
import { LogoLink } from '@/components/layout/LogoLink';
import { Button } from '@/components/ui/Button';

function Footer() {
  const t = useTranslations('layout');
  const year = new Date().getFullYear();
  return (
    <footer className='z-10 flex w-full justify-center border-t border-border/40 bg-background/95 px-11 py-10 md:px-16 lg:px-24'>
      <div className='w-full max-w-screen-2xl text-sm'>
        <div className='xs:grid-cols-2 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4'>
          <div>
            <LogoLink className='justify-start' />
            <p className='ml-2 leading-tight'>
              <strong>{t('openingHours')}:</strong>
              <br />
              <span>{t('allWeekdays')}, 10:15-18:00</span>
              <br />
              <br />
              <Button asChild variant='link' size='none'>
                <ExternalLink
                  href='https://use.mazemap.com/#v=1&zlevel=2&center=10.404406,63.415418&zoom=18&sharepoitype=poi&sharepoi=1000391296&campusid=1'
                  prefetch={false}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Realfagbygget, A-blokka
                </ExternalLink>
              </Button>
              <br />
              Høgskoleringen 5<br />
              7034 Trondheim
            </p>
          </div>
          <div>
            <h4>{t('socialMedia')}</h4>
            <ul className='grid-cols-2-auto sm:grid-cols-3-auto grid grid-flow-row justify-start text-foreground/80 xl:grid-flow-col xl:grid-cols-none'>
              <li>
                <Button asChild variant='ghost' size='sm-icon'>
                  <ExternalLink
                    href='mailto:hackerspace-styret@idi.ntnu.no'
                    aria-label={t('sendAnEmail')}
                  >
                    <Mail className='h-4 w-4' />
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' size='sm-icon'>
                  <ExternalLink
                    href='https://hackerspace-ntnu.slack.com/'
                    prefetch={false}
                    aria-label={t('visitSlack')}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Slack className='h-4 w-4' />
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' size='sm-icon'>
                  <ExternalLink
                    href='https://www.facebook.com/hackerspacentnu'
                    prefetch={false}
                    aria-label={t('visitFacebook')}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Facebook className='h-4 w-4' />
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' size='sm-icon'>
                  <ExternalLink
                    href='https://github.com/hackerspace-ntnu/'
                    prefetch={false}
                    aria-label={t('visitGithub')}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='h-4 w-4' />
                  </ExternalLink>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' size='sm-icon'>
                  <ExternalLink
                    href='https://www.instagram.com/hackerspacentnu/'
                    prefetch={false}
                    aria-label={t('visitInstagram')}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Instagram className='h-4 w-4' />
                  </ExternalLink>
                </Button>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t('links')}</h4>
            <nav>
              <ul className='ml-2 mt-2 space-y-1.5'>
                <li>
                  <Button asChild variant='nav' size='none'>
                    <Link href='/news'>{t('news')}</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='nav' size='none'>
                    <Link href='/events'>{t('events')}</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant='nav' size='none'>
                    <Link href='/about'>{t('about')}</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h4>{t('utilities')}</h4>
            <p className='ml-2 [&:not(:first-child)]:mt-0'>
              <Button asChild variant='link' size='none'>
                <Link href='/'>{t('signIn')}</Link>
              </Button>
              <br />
              {t('haveYouFoundA')} <Bug className='inline h-4 w-4' />?
              <br />
              {t.rich('utilitiesDescription', {
                MailLink: () => (
                  <Button className='inline' asChild variant='link' size='none'>
                    <ExternalLink
                      href='mailto:hackerspace-dev@idi.ntnu.no'
                      aria-label={t('sendAnEmail')}
                    >
                      <Mail className='inline h-4 w-4' />
                    </ExternalLink>
                  </Button>
                ),
                SlackLink: (children) => (
                  <Button asChild variant='link' size='none'>
                    <ExternalLink
                      href='https://hackerspace-ntnu.slack.com/archives/CDK99FYTY'
                      prefetch={false}
                      aria-label={t('visitSlack')}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {children}
                    </ExternalLink>
                  </Button>
                ),
                GithubLink: (children) => (
                  <Button asChild variant='link' size='none'>
                    <ExternalLink
                      href='https://github.com/hackerspace-ntnu/website-frontend/issues'
                      prefetch={false}
                      aria-label={t('visitGithub')}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {children}
                    </ExternalLink>
                  </Button>
                ),
              })}
            </p>
          </div>
        </div>
        <nav className='py-20'>
          <ul className='flex flex-col justify-center gap-6 sm:flex-row md:gap-10 lg:gap-20 xl:gap-40'>
            <li>
              <Button asChild variant='none' size='none'>
                <ExternalLink
                  href={t('NTNUIDIURL')}
                  prefetch={false}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IDILogo className='p-6' title={t('NTNUIDI')} />
                </ExternalLink>
              </Button>
            </li>
            <li>
              <Button asChild variant='none' size='none'>
                <ExternalLink
                  href='https://www.ntnu.no/ie/kid/'
                  prefetch={false}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <KiDLogo className='p-6' title={t('NTNUKiD')} />
                </ExternalLink>
              </Button>
            </li>
          </ul>
        </nav>
        <p className='text-center'>
          {t('copyright')} &copy; {year}, Hackerspace NTNU.{' '}
          {t('allRightsReserved')}.
        </p>
      </div>
    </footer>
  );
}

export { Footer };
