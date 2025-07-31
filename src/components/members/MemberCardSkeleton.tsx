import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';

function MemberCardSkeleton() {
  return (
    <Card className='px-2'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='h-8 w-2/3' />
        </CardTitle>
        <Skeleton className='h-5 w-1/4' />
      </CardHeader>
      <CardContent>
        <div className='relative h-48 w-48'>
          <Skeleton className='h-full w-full rounded-full object-cover object-center' />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className='h-6 w-2/3' />
      </CardFooter>
    </Card>
  );
}

export { MemberCardSkeleton };
