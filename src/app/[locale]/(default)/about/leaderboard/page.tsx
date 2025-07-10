import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Card, CardFooter, CardHeader } from '@/components/ui/Card';
import { type Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function LeaderboardPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = useTranslations('about.leaderboard');

  return (
    <div>
      <h1 className='mt-4 mb-5 w-full dark:text-primary'> {t('title')} </h1>
      <div className='mt-5 mb-5 flex w-full'>
        <p>{t('about')}</p>
      </div>
      <div>
        <h3 className='mt-10'> FAQ's </h3>
        <Accordion type='single' collapsible className='mb-10 w-full '>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='m-2'>
              <h4 className='text-left font-medium'>hei?</h4>
            </AccordionTrigger>
            <AccordionContent className='m-2 text-base '>
              hallo
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger className='m-2'>
              <h4 className='text-left font-medium'>hei?</h4>
            </AccordionTrigger>
            <AccordionContent className='m-2 text-base'>hallo</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger className='m-2'>
              <h4 className='text-left font-medium'>hei?</h4>
            </AccordionTrigger>
            <AccordionContent className='m-2 text-base'>hallo</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='max-x-xs w-full px-10'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 dark:text-primary'>
          <div className=''>
            <h3 className='mb-2'> {t('leader')} </h3>
            <Card className='p-20'>
              <CardHeader>leder</CardHeader>{' '}
              {/* use medlem-components instead.  */}
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
