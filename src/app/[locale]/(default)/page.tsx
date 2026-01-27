import { CornerUpRightIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { EventTable } from '@/components/home/EventTable';
import { IntroBanner } from '@/components/home/IntroBanner';
import { NewsTable } from '@/components/home/NewsTable';
import { TextBlock } from '@/components/home/TextBlock';
import { Link } from '@/components/ui/Link';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('home');
  const tLayout = await getTranslations('layout');

  const { user } = await api.auth.state();

  const slides = await api.slides.fetchSlides({ onlyActive: true });
  const membersOnShift = await api.shiftSchedule.fetchMembersOnShift();

  const events = await api.events.fetchEvents({ limit: 3, offset: 0 });
  const articles = await api.news.fetchArticles({ limit: 3, offset: 0 });

  const canEditSlides = user?.groups.includes('admin') ?? false;

  return (
    <div className='space-y-8'>
      <IntroBanner
        slides={slides}
        locale={locale as Locale}
        canEditSlides={canEditSlides}
        t={{
          placeholderAlt: t('placeholderAlt'),
          editSlides: t('changeSlides'),
        }}
      />
      <TextBlock
        imgSrc='/whoAreWe.jpg'
        imgAlt={t('whoAreWeAlt')}
        imgSide='right'
      >
        <h2>{t('whoAreWe')}</h2>
        <p>{t('whoAreWeDescription')}</p>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/workshop.jpg' imgAlt={t('stopByAlt')} imgSide='left'>
        <h2>{t('stopBy')}</h2>
        <p>{t('stopByDescription', { membersOnShift })}</p>
        <Link
          variant='link'
          href='/shift-schedule'
          className='flex w-fit gap-3'
        >
          {tLayout('shiftSchedule')}
          <CornerUpRightIcon size={16} />
        </Link>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/events.jpg' imgAlt={t('eventsAlt')} imgSide='right'>
        <h2>{t('events')}</h2>
        <div className='flex flex-col gap-3 md:flex-row'>
          <div className='flex flex-col gap-3 lg:w-1/2'>
            <p className='mt-2'>{t('eventsDescription')}</p>
            <Link variant='link' href='/events' className='flex w-fit gap-3'>
              {tLayout('events')} <CornerUpRightIcon size={16} />
            </Link>
          </div>
          <EventTable events={events} />
        </div>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/ducks.jpg' imgAlt={t('newsAlt')} imgSide='left'>
        <h2>{t('news')}</h2>
        <div className='flex flex-col gap-3 md:flex-row '>
          <div className='flex flex-col gap-3 lg:w-1/2'>
            <p className='mt-2'>{t('newsDescription')}</p>
            <Link variant='link' href='/news' className='flex w-fit gap-3'>
              {tLayout('news')} <CornerUpRightIcon size={16} />
            </Link>
          </div>
          <NewsTable articles={articles} />
        </div>
      </TextBlock>
    </div>
  );
}
