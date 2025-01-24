import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardTitle } from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type RuleCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  title: string;
  photoUrl: string;
};

function RuleCard({ className, id, internal, title, photoUrl }: RuleCardProps) {
  const t = useTranslations('rules');

  return (
    <Link
      className={cx('whitespace-normal font-normal', className)}
      href={{
        pathname: '/rules/[subset]',
        params: { subset: id },
      }}
      aria-label={title}
    >
      <Card className='flex size-full transform overflow-hidden rounded-xl brightness-95 transition delay-150 duration-300 ease-in-out hover:scale-105 hover:border-primary hover:border-solid hover:shadow-lg hover:brightness-100 hover:dark:brightness-110'>
        {internal ? (
          <Badge className='flex w-1/3 items-center justify-center rounded-none text-lg hover:bg-primary '>
            {t('internal')}
          </Badge>
        ) : (
          <Image
            className='flex w-1/3 rounded-none'
            src={`/${photoUrl}`}
            alt={title}
            width={150}
            height={150}
          />
        )}
        <CardTitle className='flex w-2/3 items-center justify-center text-wrap text-center font-inter text-base ~lg:text-2xl ~sm:text-xl'>
          {title}
        </CardTitle>
      </Card>
    </Link>
  );
}

export { RuleCard };
