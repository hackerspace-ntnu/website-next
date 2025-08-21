import { getTranslations } from 'next-intl/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

type FAQ = {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
  icon?: React.ReactNode;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

async function FAQAccordion({ faqs }: FAQAccordionProps) {
  const t = await getTranslations('about.FAQ');

  return (
    <div className='mt-10 mb-10'>
      <h3>{t('title')}</h3>
      <Accordion
        type='single'
        collapsible
        className='w-full dark:text-foreground'
      >
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className='m-2'>
              <div className='flex items-center justify-center'>
                {faq.icon && <span className='m-2'>{faq.icon}</span>}
                <span className='text-lg'>{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className='m-2 text-base'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export { FAQAccordion, type FAQ, type FAQAccordionProps };
