import { Card, CardFooter } from '@/components/ui/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default function MemberRepresentativePage({
    params: { locale },
  }: {
    params: { locale: string };
  }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations('member_representative')

    return  (
        <div>
            <h1 className='items-center justify-center w-full flex mt-4 dark:text-primary'> Member Representative </h1>
            <div className=' w-full py-5'>
                {t.rich('information', {
                p1: (chunks) => <p className="/p1"> {chunks}</p>,
                p2: (chunks) => <p className="/p2"> {chunks}</p>
                })} 
            </div>
            <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-20 dark:text-primary w-full'>
                <div className='flex content-center justify-center'>
                    <Card>
                        hihi
                        <CardFooter> member-card av tillietsvalgt </CardFooter>
                    </Card>
                </div>
                <div>
                    <h3 className='dark:text-foreground'> FAQ'S </h3>
                    
                        <Accordion type="single" collapsible className='w-full dark:text-foreground'>
                            <AccordionItem value='item-1'>
                                <AccordionTrigger className='text-left text-xl font-medium m-2'> 
                                   bruh
                                </AccordionTrigger>
                                <AccordionContent className='text-base m-2'> Non fugiat labore quo consequatur molestiae nam sequi dignissimos sit voluptas nostrum nam autem Quis. </AccordionContent>
                            
                            </AccordionItem>
                            <AccordionItem value='item-2'>
                                <AccordionTrigger className='text-left text-xl font-medium m-2'> Non fugiat labore quo consequatur</AccordionTrigger>
                                <AccordionContent className='text-base m-2'> svaret ligger her  </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value='item-3'>
                                <AccordionTrigger className='text-left text-xl font-medium m-2'> hihi </AccordionTrigger>
                                <AccordionContent className='text-base m-2'> svaret ligger her  </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    
                </div>
            </div>
        </div>
    );
  }
  