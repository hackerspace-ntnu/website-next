'use client';

import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

function InformationCard({
  printerRuleId,
}: {
  printerRuleId: RouterOutput['rules']['fetch3dPrinterRuleId'];
}) {
  const t = useTranslations('reservations');

  return (
    <Card className='rounded-b-none'>
      <CardContent>
        <CardHeader>
          <CardTitle>{t('information.importantTitle')}</CardTitle>
          <CardDescription className='clamp-[text-sm-lg-clamp] text-balance'>
            {printerRuleId
              ? t.rich('information.importantText', {
                  link: (chunks) => (
                    <Link
                      href={{
                        pathname: '/rules/[subsetId]',
                        params: { subsetId: printerRuleId },
                      }}
                      className='text-primary'
                    >
                      {chunks}
                    </Link>
                  ),
                })
              : t.rich('information.importantText', {
                  link: (chunks) => chunks,
                })}
          </CardDescription>
        </CardHeader>
      </CardContent>
    </Card>
  );
}

export { InformationCard };
