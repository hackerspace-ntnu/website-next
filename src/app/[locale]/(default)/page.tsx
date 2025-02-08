import { EventTable } from '@/components/home/EventTable';
import { HelloWorld } from '@/components/home/HelloWorld';
import { NewsTable } from '@/components/home/NewsTable';
import { TextBlock } from '@/components/home/TextBlock';
import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api/server';
import { articleMockData } from '@/mock-data/article';
import { events } from '@/mock-data/events';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('home');

  const hello = await api.test.helloWorld();
  return (
    <div className='space-y-8'>
      <TextBlock imgSrc='/bg.jpg' imgAlt='...' imgSide='right'>
        <h2>{t('whoAreWe')}</h2>
        <p>{t('whoAreWeDescription')}</p>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/unknown.png' imgAlt='...' imgSide='left'>
        <h2>{t('stopBy')}</h2>
        <p>{t('stopByDescription')}</p>
        <div className='flex gap-3'>
          <span className='my-auto'>{t('onShift')}</span>
          <Skeleton className='size-12' />
          <Skeleton className='size-12' />
          <Skeleton className='size-12' />
        </div>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/event.webp' imgAlt='...' imgSide='right'>
        <h2>{t('events')}</h2>
        <div className='flex gap-3'>
          <p>{t('eventsDescription')}</p>
          <EventTable events={events.slice(0, 3)} />
        </div>
      </TextBlock>
      <Separator />
      <TextBlock imgSrc='/mock.jpg' imgAlt='...' imgSide='left'>
        <h2>{t('news')}</h2>
        <div className='flex gap-3 '>
          <p>{t('newsDescription')}</p>
          <NewsTable articles={articleMockData.slice(0, 3)} />
        </div>
      </TextBlock>
      <div>
        <p className='pt-10'>Testing stuff:</p>
        <HelloWorld />
        <h2>{hello}</h2>
      </div>
    </div>
  );
}
