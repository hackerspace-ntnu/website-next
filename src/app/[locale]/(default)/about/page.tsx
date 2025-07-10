import { type FAQ, FAQAccordion } from '@/components/about/FAQAccordion';
import { GroupCard } from '@/components/about/GroupCard';
import { HackerspaceLogo } from '@/components/assets/logos';
import { api } from '@/lib/api/server';
import { Gamepad2, Printer, SquareUserRound } from 'lucide-react';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';

export async function generateMetadata() {
  const t = await getTranslations('layout');

  return {
    title: t('about'),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const tFAQ = await getTranslations('about.FAQ');

  const groups = await api.about.fetchGroups();

  const faqs: FAQ[] = [
    {
      id: 'item-1',
      icon: <Printer />,
      question: tFAQ('canIUseThe3dPrinter'),
      answer: tFAQ.rich('answerCanIUseThe3dPrinter', {
        p1: (chunks) => <p className='p1'>{chunks}</p>,
        p2: (chunks) => <p className='p2'>{chunks}</p>,
      }),
    },
    {
      id: 'item-2',
      icon: <Gamepad2 />,
      question: tFAQ('canITryVRGames-Equipment'),
      answer: tFAQ('answerCanITryVRGames-Equipment'),
    },
    {
      id: 'item-3',
      icon: <SquareUserRound />,
      question: tFAQ('howDoIBecomeAMember'),
      answer: tFAQ.rich('answerHowDoIBecomeAMember', {
        p1: (chunks) => <p className='p1'>{chunks}</p>,
        p2: (chunks) => <p className='p2'>{chunks}</p>,
      }),
    },
  ];

  return (
    <div>
      <HackerspaceLogo className='mx-auto mt-7 mb-5 h-36 w-36' />
      <h1 className='mt-8 mb-4 text-center'>{t('whatIsHackerspace')}</h1>
      <div className='mx-auto mb-6 max-w-prose text-base'>
        {t.rich('aboutDescription', {
          p1: (chunks) => <p className='p1'>{chunks}</p>,
          p2: (chunks) => <p className='p2'>{chunks}</p>,
          p3: (chunks) => <p className='p3'>{chunks}</p>,
        })}
      </div>
      <h2 className='m-5 content-center items-center text-center'>
        {t('activeGroup')}
      </h2>
      <div className='mx-auto grid w-fit grid-cols-1 items-center justify-center gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3'>
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
      <FAQAccordion faqs={faqs} />
    </div>
  );
}
