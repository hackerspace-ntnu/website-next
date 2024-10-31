import { Card, CardFooter } from '@/components/ui/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { FAQAccordion } from '@/components/about/FAQAccordion';

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
                    <h2> faq accordion </h2>
                    
                </div>
            </div>
        </div>
    );
  }
  