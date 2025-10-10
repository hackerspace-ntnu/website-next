import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';

function InformationCard() {
  const t = useTranslations('reservations');
  return (
    <Card className='rounded-b-none'>
      <CardContent>
        <CardHeader>
          <CardTitle>{t('information.importantTitle')}</CardTitle>
          <CardDescription className='clamp-[text-sm-lg-clamp] text-balance'>
            {t.rich('information.importantText', {
              link: (chunks) => (
                <Link
                  href={{
                    pathname: '/rules/[subsetId]',
                    params: { subsetId: 5 },
                  }}
                  className='text-primary'
                >
                  {chunks}
                </Link>
              ),
            })}
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}

export { InformationCard };
