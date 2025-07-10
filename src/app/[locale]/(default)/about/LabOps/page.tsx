import { FAQAccordion } from '@/components/about/FAQAccordion';
import { MembersTable } from '@/components/about/MembersTable';
import { type Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function LabopsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = useTranslations('about.labops');

  const faqs = [
    { id: 'faq1', question: t('FAQ.question1'), answer: t('FAQ.answer1') },
    { id: 'faq2', question: t('FAQ.question2'), answer: t('FAQ.answer2') },
    { id: 'faq3', question: t('FAQ.question3'), answer: t('FAQ.answer3') },
  ];

  return (
    <div>
      <h1 className='w-full'> {t('title')} </h1>
      <p> {t('about')} </p>
      {/* //<FAQAccordion faqs={faqs} m-20 /> */}
    </div>
  );
}
