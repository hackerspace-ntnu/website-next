import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function InformationCard() {
  const t = useTranslations('reservations');
  return (
    <Card className='rounded-t-none'>
      <CardContent>
        <CardHeader>
          <CardTitle>{t('information.importantTitle')}</CardTitle>
          <CardDescription className='text-balance text-sm-lg-clamp'>
            {t.rich('information.importantText', {
              link: (chunks) => (
                <a href='/regler/5' className='text-primary'>
                  {chunks}
                </a>
              ),
            })}
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}
