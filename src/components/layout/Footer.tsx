import { useTranslations } from 'next-intl';
import ExternalLink from 'next/link';

import { Link } from '@/lib/navigation';

import { LogoLink } from '@/components/layout/LogoLink';
import { Button } from '@/components/ui/Button';

function Footer() {
  const t = useTranslations('layout');
  const year = new Date().getFullYear();
  return (
    <footer className='z-10 flex w-full justify-center border-b border-border/40 bg-background/95 px-11 py-10 md:px-16 lg:px-24'>
      <div className='w-full max-w-screen-2xl text-sm'>
        <div className='xs:grid-cols-2 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-3 lg:grid-cols-4'>
          <div>
            <LogoLink className='justify-start' />
            <p className='ml-2 leading-tight'>
              <Button asChild variant='link' size='none'>
                <ExternalLink
                  href='https://use.mazemap.com/#v=1&zlevel=2&center=10.404406,63.415418&zoom=18&sharepoitype=poi&sharepoi=1000391296&campusid=1'
                  prefetch={false}
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
            <h4>{t('links')}</h4>
            <nav>
              <ul>
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
        </div>
      </div>
    </footer>
  );
}

export { Footer };
