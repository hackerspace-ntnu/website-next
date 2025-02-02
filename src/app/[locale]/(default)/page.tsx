import { HelloWorld } from '@/components/home/HelloWorld';
import { TextBlock } from '@/components/home/TextBlock';
import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';
import { api } from '@/lib/api/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

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
      <TextBlock imgSrc='/bg.jpg' imgAlt='...' imgSide='right'>
        <h2>text</h2>
        <p>mhm yes text text text</p>
      </TextBlock>
      <div>
        <p className='pt-10'>Testing stuff:</p>
        <HelloWorld />
        <h2>{hello}</h2>
      </div>
    </div>
  );
}
