import { Card} from '@/components/ui/Card';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { FAQAccordion } from '@/components/about/FAQAccordion';

export default function devopsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('about.devops');

  return (
    <div>
        <h1 className='mt-4 mb-4 w-full'> DevOps </h1>
        <div className='flex w-full'> {t('about')} </div>
      <div className='mt-10 mb-10'>
        
      </div>
      <div className='max-x-xs w-full px-10'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
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
            </div>
        </div>
      </div>
    </div>
  );
}