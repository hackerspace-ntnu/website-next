import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';
import { Card, CardTitle } from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import type { RouterOutput } from '@/server/api';
import { getFileUrl } from '@/server/services/files';

type RuleCardProps = {
  className?: string;
  rule: RouterOutput['rules']['fetchRules'][number];
};

async function RuleCard({ className, rule }: RuleCardProps) {
  const tLayout = await getTranslations('layout');

  const photoUrl = rule.imageId ? await getFileUrl(rule.imageId) : null;

  if (!rule.localization) return null;

  return (
    <Link
      className={cx(className)}
      href={{
        pathname: '/rules/[subsetId]',
        params: { subsetId: rule.id },
      }}
      aria-label={rule.localization.name}
    >
      <Card className='flex h-18 w-full transform overflow-hidden rounded-xl brightness-95 transition duration-300 ease-in-out hover:scale-105 hover:border-primary hover:border-solid hover:shadow-lg hover:brightness-100 hover:dark:brightness-110'>
        {photoUrl && (
          <Image
            className='flex w-1/3 rounded-none object-cover'
            src={photoUrl}
            alt={rule.localization.name}
            width={150}
            height={150}
          />
        )}
        {rule.internal && !photoUrl && (
          <Badge className='clamp-[text-lg-xl-clamp]! flex w-1/3 items-center justify-center rounded-none hover:bg-primary'>
            {tLayout('internal')}
          </Badge>
        )}
        {!rule.internal && !photoUrl && (
          <div className='flex h-full w-1/3 bg-primary' />
        )}
        <CardTitle className='clamp-[text-xl-2xl-clamp]! flex w-2/3 items-center justify-center text-wrap text-center'>
          {rule.localization.name}
        </CardTitle>
      </Card>
    </Link>
  );
}

export { RuleCard };
