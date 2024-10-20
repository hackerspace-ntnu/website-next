import { unstable_setRequestLocale } from 'next-intl/server';
import { Button } from 'src/components/ui/Button';
import React from 'react';
import { Card, CardContent, CardHeader } from 'src/components/ui/Card';
import { useTranslations } from 'next-intl';
import { Map, Printer, Gamepad2, SquareUserRound } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Meteors } from '@/components/ui/Meteor';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('about');

const cardData = [
  { id: 1, title: t('example-title'), content: t('example-text'), link: `/${locale}/about/leaderboard`},
  { id: 2, title: t('example-title'), content: t('example-text'), link: `/${locale}/about/leaderboard`},
  { id: 3, title: t('example-title'), content: t('example-text'), link: `/${locale}/about/leaderboard`},
  { id: 3, title: t('example-title'), content: t('example-text'), link: `/${locale}/about/leaderboard`},
  { id: 3, title: t('example-title'), content: t('example-text'), link: `/${locale}/about/leaderboard`},
  { id: 3, title: t('example-title'), content: t('example-text'), link: `/${locale}/about/leaderboard`},
];

const faqItems = [
  {
    id: 'item-1',
    icon: Printer,
    question: t('canIUseThe3dPrinter'),
    answer: t.rich('answerCanIUseThe3dPrinter', {
      p1: (chunks) => <p className="p1">{chunks}</p>,
      p2: (chunks) => <p className="p2">{chunks}</p>
    })
  },
  {
    id: 'item-2',
    icon: Gamepad2,
    question: t('canITryVRGames-Equipment'),
    answer: t('answerCanITryVRGames-Equipment')
  },
  {
    id: 'item-3',
    icon: SquareUserRound,
    question: t('howDoIBecomeAMember'),
    answer: t.rich('answerHowDoIBecomeAMember', {
      p1: (chunks) => <p className="p1">{chunks}</p>,
      p2: (chunks) => <p className="p2">{chunks}</p>
    })
  }
];

  return <div>
    <div className='mt-7 mb-5 flex flex-col items-center justify-center'>
      <Image className='pizzaWolfs'
      src="/about/pizzaWolfs-min.png" 
      alt="pizza wolfs" 
      height={400} 
      width={400}
      priority 
      />
    </div>
    <div>
      <h1 className='mt-8 mb-4 dark:text-primary '> {t('whatIsHackerspace')} </h1>
      <div className='mb-6 text-base'> 
        {t.rich('aboutDescription', {
          p1: (chunks) => <p className="p1"> {chunks} </p>,
          p2: (chunks) => <p className="p2"> {chunks} </p>,
          p3: (chunks) => <p className="p3"> {chunks} </p>
        })} 
      </div>
    </div>
    <div className='flex flex-col items-center justify-center '>
      <Link href="https://link.mazemap.com/PPDMWZlM" passHref target="_blank" rel="noopener noreferrer">
        <Button className=''> <Map className='m-1'/> {t('showMap')} </Button>
      </Link>
    </div>
    <div> 
      <h3 className='mt-10'> FAQ's </h3>
      <Accordion type="single" collapsible className='mb-10 w-full'>
        {faqItems.map(item => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger>
              <div className='m-2 flex items-center'>
                <item.icon className='mr-2' />
                <h4 className='text-left font-medium'>{item.question}</h4>
              </div>
            </AccordionTrigger>
            <AccordionContent className='m-2 text-base'>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
    <div className='max-x-xs relative w-full'>
      <h2 className='content-center items-center text-center'> {t('activeGroup')} </h2>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {cardData.map(card => (
          <div key={card.id} className='group relative p-4'>
            <Card className='relative overflow-hidden group-hover:underline'>
              <CardHeader className='font-semibold text-xl'>{card.title}</CardHeader>
              <CardContent>{card.content}</CardContent>
              <div className='absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                <Meteors number={10} className={'absolute inset-0 z-10'} hoverDelay='0.5s' />
              </div>
            </Card>            
          </div>
        ))}
      </div>
    </div>
  </div>;
}