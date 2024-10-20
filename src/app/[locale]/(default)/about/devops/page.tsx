import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { Card} from '@/components/ui/Card';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

import * as React from 'react';
import ClientDevOpsPage from './ClientPage';

export default function devopsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('devops');

  return (
    <div>
        <div className='flex flex-col items-center'>
            <div className='flex max-h-[600px] w-full max-w-full items-center justify-center sm:max-h-[400px] sm:max-w-[400px]'>
                <ClientDevOpsPage locale={locale} />
            </div>
        </div>
        <h1 className='mt-4 mb-4 w-full dark:text-primary'> DevOps </h1>
        <div className='mt-5 mb-5 flex w-full'>
            {t('information')}
        </div>
      <div className='mt-10 mb-10'>
        <h3> FAQ'S </h3>
        <Accordion type="single" collapsible className='mb-10 w-full'>
            <AccordionItem value='item-1'>
                <AccordionTrigger className='m-2'>                  
                        <h4 className='text-left font-medium'>{t('question1')}</h4>
                </AccordionTrigger>
                <AccordionContent className='m-2 text-base'>
                    {t('answer1')}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
                <AccordionTrigger className='m-2'>
                    <h4 className='text-left font-medium'>{t('question2')}</h4>
                </AccordionTrigger>
                <AccordionContent className='m-2 text-base'>
                {t('answer2')}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
                <AccordionTrigger className='m-2'>
                    <h4 className='text-left font-medium'>{t('question3')}</h4>              
                </AccordionTrigger>
                <AccordionContent className='m-2 text-base'>
                {t('answer3')}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
      <div className='max-x-xs w-full px-10'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 dark:text-primary'>
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
                <div>
                    <h3 className='mb-2'> Leder </h3>
                    <Card className='py-30'> leder </Card>
                </div>
                <div>
                    <h3 className='mb-2'> Nestleder </h3>
                    <Card className='py-30'> nestleder </Card>
                </div>
            </div>
            <div>
                <h3 className=''> Medlemmer </h3>
                {/* biome-ignore lint/a11y/noRedundantRoles: <explanation> */}
                <ul role='list' className='divide-y divide-grey-100 dark:text-foreground'>
                    <li className='flex justify-between gap-x-6 py-1'>
                        <div className='flex min-w-0 gap-4'>
                            <Image className='pizzaWolfs flex-none rounded-full bg-grey-50'
                                src="/about/pizzaWolfs-min.png" 
                                alt="pizza wolfs" 
                                height={40} 
                                width={40}/>
                            <div className='min-w-0 flex-center'>
                                <p className='leading-10 '>
                                    John Doe
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className='flex justify-between gap-x-6 py-1'>
                        <div className='flex min-w-0 gap-4'>
                            <Image className='pizzaWolfs flex-none rounded-full bg-grey-50'
                                src="/about/pizzaWolfs-min.png" 
                                alt="pizza wolfs" 
                                height={40} 
                                width={40}/>
                            <div className='min-w-0 flex-center'>
                                <p className='text- leading-10'>
                                    Kari Nordmann
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className='flex justify-between gap-x-6 py-1'>
                        <div className='flex min-w-0 gap-4'>
                            <Image className='pizzaWolfs flex-none rounded-full bg-grey-50'
                                src="/about/pizzaWolfs-min.png" 
                                alt="pizza wolfs" 
                                height={40} 
                                width={40}/>
                            <div className='min-w-0 flex-center'>
                                <p className='text- leading-10'>
                                    Ola Nordmann
                                </p>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </div>
      </div>
    </div>
  );
}