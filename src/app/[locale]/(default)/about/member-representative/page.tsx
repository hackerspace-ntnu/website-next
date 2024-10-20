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
    const t = useTranslations('member-representative')

    return  (
        <div>
            <h1 className='mt-4 flex w-full items-center justify-center dark:text-primary'> Member Representative </h1>
            <div className=' w-full py-5'>
                {t.rich('information', {
                p1: (chunks) => <p className="/p1"> {chunks}</p>,
                p2: (chunks) => <p className="/p2"> {chunks}</p>
                })} 
            </div>
            <div className='grid w-full gap-6 px-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 dark:text-primary'>
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
                                <AccordionTrigger className='m-2 text-left font-medium text-xl'> 
                                   bruh
                                </AccordionTrigger>
                                <AccordionContent className='m-2 text-base'> Non fugiat labore quo consequatur molestiae nam sequi dignissimos sit voluptas nostrum nam autem Quis. </AccordionContent>
                            
                            </AccordionItem>
                            <AccordionItem value='item-2'>
                                <AccordionTrigger className='m-2 text-left font-medium text-xl'> Non fugiat labore quo consequatur</AccordionTrigger>
                                <AccordionContent className='m-2 text-base'> svaret ligger her  </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value='item-3'>
                                <AccordionTrigger className='m-2 text-left font-medium text-xl'> hihi </AccordionTrigger>
                                <AccordionContent className='m-2 text-base'> svaret ligger her  </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    
                </div>
            </div>
        </div>
    );
  }
  