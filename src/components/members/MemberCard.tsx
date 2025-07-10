import Image from 'next/image';

import { Link } from '@/lib/locale/navigation';
import { cx } from '@/lib/utils';

import { InternalBadge } from '@/components/members/InternalBadge';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

type MemberCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  name: string;
  group?: string;
  photoUrl: string;
  bio: string;
  mail: string;
  instagram?: string;
  discord?: string;
  github?: string;
  linkedin?: string;
};

function MemberCard({
  className,
  id,
  internal,
  name,
  group,
  photoUrl,
  bio,
  mail,
  instagram,
  discord,
  github,
  linkedin,
}: MemberCardProps) {
  return (
    <Button
      className={cx('group whitespace-normal font-normal', className)}
      asChild
      variant='none'
      size='none'
    >
      <Link
        href={{
          pathname: '/members/[memberId]',
          params: { memberId: id },
        }}
      >
        <Card className='relative flex h-full min-h-60 w-full overflow-hidden'>
          <InternalBadge internal={internal} />
          <Image
            className='rounded-full object-cover object-center transition-transform duration-300 group-hover:scale-105'
            src={`/${photoUrl}`}
            alt={name}
            priority
            fill
          />
          <CardHeader className='mt-auto w-full bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:p-6'>
            <CardTitle className='line-clamp-1 text-lg transition-colors group-hover:text-primary sm:text-xl lg:text-2xl'>
              {name}
            </CardTitle>
            <CardDescription className='line-clamp-1 text-xs sm:text-sm' />
          </CardHeader>
        </Card>
      </Link>
    </Button>
  );
}

export { MemberCard, type MemberCardProps };
