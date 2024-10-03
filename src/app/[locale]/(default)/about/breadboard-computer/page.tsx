import { Card, CardFooter } from '@/components/ui/Card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/Accordion';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default function BreadBoardComputerPage({
    params: { locale },
  }: {
    params: { locale: string };
  }) {
    unstable_setRequestLocale(locale);
    const t = useTranslations('breadboard_computer')

    return  (
        <div> heheeheheh </div>
    );
}