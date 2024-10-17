import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Button } from 'src/components/ui/Button';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from 'src/components/ui/Card';
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
  {
    id: 1,
    title: t('example_title'),
    content: t('example_text'),
    
    link: `/${locale}/about/leaderboard`
  },
  {
    id: 2,
    title: t('example_title'),
    content: t('example_text'),
  
    link: `/${locale}/about/leaderboard`
  },
  {
    id: 3,
    title: t('example_title'),
    content: t('example_text'),
   
    link: `/${locale}/about/leaderboard`
  },
  {
    id: 3,
    title: t('example_title'),
    content: t('example_text'),
  
    link: `/${locale}/about/leaderboard`
  },
  {
    id: 3,
    title: t('example_title'),
    content: t('example_text'),
   
    link: `/${locale}/about/leaderboard`
  },
  {
    id: 3,
    title: t('example_title'),
    content: t('example_text'),
   
    link: `/${locale}/about/leaderboard`
  },
]

  return <div>
    <div className='flex flex-col items-center justify-center mt-7 mb-5'>
      <Image className='pizzaWolfs'
      src="/about/pizzaWolfs-min.png" 
      alt="pizza wolfs" 
      height={400} 
      width={400} 
      />
    </div>

    <div>
      <h1 className='dark:text-primary mt-8 mb-4 '> {t('WhatIsHackerspace')} </h1>
      <div className='mb-6 text-base'> 
        {t.rich('WhatIsHackerspace_info', {
        p1: (chunks) => <p className="/p1"> {chunks}</p>,
        p2: (chunks) => <p className="/p2"> {chunks}</p>,
        p3: (chunks) => <p className="/p3"> {chunks}</p>
        })} 
      </div>
    </div>
    <div className='flex felx-col items-center justify-center '>
      <Link href="https://link.mazemap.com/PPDMWZlM" passHref target="_blank" rel="noopener noreferrer">
        <Button className=''> <Map className='m-1'/> {t('ShowMaps')} </Button>
      </Link>

    </div>

    <div> 
      <h3 className='mt-10'> FAQ's </h3>
      <Accordion type="single" collapsible className='w-full mb-10'>
        <AccordionItem value="item-1">
          <AccordionTrigger> 
            <div className='flex items-center m-2'>
              <Printer className='mr-2'/>
              <h4 className='font-medium'>{t('Question_1')}</h4>
            </div>
          </AccordionTrigger>
          <AccordionContent className='text-base m-2'>
            {t.rich('Answer_1', {
              p1: (chunks) => <p className="/p1"> {chunks} </p>,
              p2: (chunks) => <p className="/p2"> {chunks} </p>
            })}           
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger> 
            <div className='flex items-center m-2'> 
              <Gamepad2 className='mr-2'/>
              <h4 className='font-medium'>{t('Question_2')}</h4>
            </div>
          </AccordionTrigger>
          <AccordionContent className='text-base m-2'>
            {t('Answer_2')}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger> 
            <div className='flex items-center m-2'> 
              <SquareUserRound className='mr-2'/>
              <h4 className='font-medium'>{t('Question_3')}</h4>
            </div>
          </AccordionTrigger>
          <AccordionContent className='text-base m-2'> 
            {t.rich('Answer_3', {
              p1:  (chucks) => <p className="/p1"> {chucks} </p>,
              p2:  (chucks) => <p className="/p2"> {chucks} </p>
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>

    <div className='w-full relative max-x-xs'>
      <h2 className='items-center content-center text-center'> {t('ActiveGroup')} </h2>
      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {cardData.map(card => (
          <div key={card.id} className="relative group p-4">
            <Card className="overflow-hidden relative group-hover:underline">
              <CardHeader className='text-xl font-semibold'>{card.title}</CardHeader>
              <CardContent>{card.content}</CardContent>
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Meteors number={10} className={'absolute inset-0 z-10'} hoverDelay='0.5s' />
              </div>
            </Card>            
          </div>
        ))}
      </div>
    </div>
  </div>;
}