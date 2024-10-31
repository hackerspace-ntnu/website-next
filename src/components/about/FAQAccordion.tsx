import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';

type FAQ = {
  id: string;
  question: string;
  answer: string;

  icon?: React.ReactNode;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <div>
      <h3> FAQ'S </h3>
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

export { FAQAccordion };
