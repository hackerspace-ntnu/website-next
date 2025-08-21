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
import { articleMockData } from '@/mock-data/article';
import { events } from '@/mock-data/events';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tLayout = await getTranslations('layout');

  const membersOnShift = await api.shiftSchedule.fetchMembersOnShift();

  return (
    <div className='space-y-8'>
      <IntroBanner />
      <TextBlock imgSrc='/bg.jpg' imgAlt='...' imgSide='right'>
        <h2>{t('whoAreWe')}</h2>
        <p>{t('whoAreWeDescription')}</p>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/unknown.png' imgAlt='...' imgSide='left'>
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
      <TextBlock imgSrc='/event.webp' imgAlt='...' imgSide='right'>
        <h2>{t('events')}</h2>
        <div className='flex gap-3'>
          <div className='flex flex-col gap-3'>
            <p>{t('eventsDescription')}</p>
            <Link variant='link' href='/events' className='flex w-fit gap-3'>
              {tLayout('events')} <CornerUpRightIcon size={16} />
            </Link>
          </div>
          <EventTable events={events.slice(0, 3)} />
        </div>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/mock.jpg' imgAlt='...' imgSide='left'>
        <h2>{t('news')}</h2>
        <div className='flex gap-3 '>
          <div className='flex flex-col gap-3'>
            <p>{t('newsDescription')}</p>
            <Link variant='link' href='/news' className='flex w-fit gap-3'>
              {tLayout('news')} <CornerUpRightIcon size={16} />
            </Link>
          </div>
          <NewsTable articles={articleMockData.slice(0, 3)} />
        </div>
      </TextBlock>
    </div>
  );
}
