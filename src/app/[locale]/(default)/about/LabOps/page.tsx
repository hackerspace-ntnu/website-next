import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';

import { FAQAccordion } from '@/components/about/FAQAccordion';

export default function labopsPage({
    params: { locale },
  }: {
    params: { locale: string};
  }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations('about.labops');

    const faqs = [
        { id: 'faq1', question: t('FAQ.question1'), answer: t('FAQ.answer1') },
        { id: 'faq1', question: t('FAQ.question2'), answer: t('FAQ.answer2') },
        { id: 'faq1', question: t('FAQ.question3'), answer: t('FAQ.answer3') },
      ];
    

    return (
        <div>
            <h1 className='mt-4 mb-4 w-full dark:text-primary'> {t('title')} </h1>
          <div className='flex w-full'> {t('about')} </div>
          <div className='mt-10 mb-10'>
            <FAQAccordion faqs={(faqs)}/>
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