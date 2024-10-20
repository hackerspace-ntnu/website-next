import { Button } from '@/components/ui/Button';
import { Card, CardFooter, CardHeader } from '@/components/ui/Card';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';

export default function LeaderboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('leaderboard');

  return (
    
    <div>
      <h1 className='w-full mt-4 mb-5 dark:text-primary'> {t('leaderboard')} </h1>
      <div className='flex w-full mt-5 mb-5'>
        <p>
          {t('aboutLeaderboard')}
        </p>
      </div>
      <div>
        <h3 className='mt-10'> FAQ's </h3>
        <Accordion type="single" collapsible className='w-full mb-10 '>
          <AccordionItem value="item-1">
            <AccordionTrigger className='m-2'> 
              <h4 className='font-medium text-left'>hei?</h4>
            </AccordionTrigger>
            <AccordionContent className='text-base m-2 '>
              hallo 
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className='m-2'> 
            <h4 className='font-medium text-left'>hei?</h4>
            </AccordionTrigger>
            <AccordionContent className='text-base m-2'>
              hallo
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className='m-2'> 
            <h4 className='font-medium text-left'>hei?</h4>
            </AccordionTrigger>
            <AccordionContent className='text-base m-2'> 
              hallo
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='w-full max-x-xs px-20'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 dark:text-primary'>
            <div className=''>
              <h3 className='mb-2'> {t('leader')} </h3>
              <Card className='p-20'>
                <CardHeader>leder</CardHeader> {/* use medlem-components instead.  */}
                <CardFooter>
                  <Button> send email </Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <h3 className='mb-2'> {t('deputyLeader')} </h3>
              <Card className='p-20'>
                <CardHeader> Nestleder </CardHeader>
                <CardFooter>
                  <Button>send email</Button>
                </CardFooter>
              </Card>
            </div>
            <div>
              <h3 className='mb-2'> {t('financialManager')} </h3>
              <Card className='p-20'>
                <CardHeader> Økonomiansvarlig </CardHeader>
                <CardFooter>
                  <Button>send email</Button>
                </CardFooter>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
