import { InternalBadge } from '@/components/members/InternalBadge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { cx } from '@/lib/utils';
import Image from 'next/image';

type MemberItemCardProps = {
  className?: string;
  id: number;
  internal: boolean;
  name: string;
  group: string;
  photoUrl: string;
};

function MemberCard({
  className,
  id,
  internal,
  name,
  group,
  photoUrl,
}: MemberItemCardProps) {
  return (
    <Link
      className={cx('group block whitespace-normal font-normal', className)}
      href={{
        pathname: '/members/[memberId]',
        params: { memberId: id },
      }}
      variant='none'
      size='none'
    >
      <Card className='relative px-2'>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{group}</CardDescription>
        </CardHeader>
        <CardContent>
          {internal && (
            <InternalBadge className='absolute top-2 right-2 h-5 w-5' />
          )}
          <div className='relative h-48 w-48'>
            <Image
              className='rounded-full object-cover object-center'
              src={`/${photoUrl}`}
              alt={name}
              fill
            />
          </div>
        </CardContent>
        <CardFooter>
          <p>Member since...</p>
        </CardFooter>
      </Card>
    </Link>
  );
}

export { MemberCard };
