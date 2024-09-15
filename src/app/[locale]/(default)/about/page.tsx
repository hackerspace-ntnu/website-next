import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {Button} from 'src/components/ui/Button';
import React from 'react'
import {Card, CardContent, CardFooter, CardHeader} from 'src/components/ui/Card'
import { useTranslations } from 'next-intl';
import { Map, Printer, Gamepad2, SquareUserRound } from 'lucide-react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/Accordion'
import { Meteors } from '@/components/ui/Meteor';
import dynamic from 'next/dynamic';

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
    title: t('Leaderboard'),
    content: t('About_Leaderboard'),
    buttonText: t('Show_More')
  },
  {
    id: 2,
    title: t('Leaderboard'),
    content: t('About_Leaderboard'),
    buttonText: t('Show_More')
  },
  {
    id: 3,
    title: t('Leaderboard'),
    content: t('About_Leaderboard'),
    buttonText: t('Show_More')
  },
]

  return <div>
    <div className='flex flex-col items-center justify-center mt-7 mb-5'>
      <img className='pizzaWolfs'
      src="/about/pizzaWolfs-min.png" 
      alt="pizza wolfs" 
      height={400} 
      width={400} 
      />
    </div>

    <div>
      <p className='text-5xl dark:text-primary'> {t('WhatIsHackerspace')} </p>
      <p className='mb-6'> 
        {t.rich('WhatIsHackerspace_info', {
        p1: (chunks) => <p className="/p1"> {chunks}</p>,
        p2: (chunks) => <p className="/p2"> {chunks}</p>,
        p3: (chunks) => <p className="/p3"> {chunks}</p>
        })} 
      </p>
    </div>
    <div className='flex felx-col items-center justify-center '>
      <Button className=''> <Map className='m-1'/> {t('ShowMaps')} </Button>

    </div>

    <div> 
      <h3 className='mt-10'> FAQ's </h3>
      <Card className='mt-4 mb-4'>
        <Accordion type="single" collapsible className='w-full'>
          <AccordionItem value="item-1">
            <AccordionTrigger> 
              <div className='flex items-center m-2'>
                <Printer className='mr-2'/>
                {t('Question_1')} 
              </div>
            </AccordionTrigger>
            <AccordionContent >
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
                {t('Question_2')}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {t('Answer_2')}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger> 
              <div className='flex items-center m-2'> 
                <SquareUserRound className='mr-2'/>
                {t('Quesition_3')}
              </div>
            </AccordionTrigger>
            <AccordionContent> 
              {t.rich('Answer_3', {
                p1:  (chucks) => <p className="/p1"> {chucks} </p>,
                p2:  (chucks) => <p className="/p2"> {chucks} </p>
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
    <div className='w-full relative max-x-xs'>
      <h4 className='text-4xl font-medium items-center mt-20 mb-5 content-center text-center'> {t('ActiveGroup')} </h4>
      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {cardData.map(card => (
        <div key={card.id} className="relative group p-4">
          <Card className="overflow-hidden relative">
            <CardHeader>{card.title}</CardHeader>
            <CardContent>{card.content}</CardContent>
            <CardFooter>
              <Button>{card.buttonText}</Button>
            </CardFooter>
            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Meteors number={20} className={'absolute inset-0 z-10'} />
          </div>
          </Card>
          
        </div>
      ))}
      </div>
    </div>
  </div>;
}