import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { cx } from '@/lib/utils';

type CoffeeCardProps = {
  imgSource: string;
  drinkType: string;
  className?: string;
};

function CoffeeCard({ imgSource, drinkType, className }: CoffeeCardProps) {
  return (
    <Card className={cx('relative m-0 rounded-2xl p-0', className)}>
      <CardContent className='relative m-0 h-full w-full rounded-2xl p-0'>
        <h2 className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10'>
          {drinkType}
        </h2>
        <Image
          src={
            'https://preview.redd.it/i-drew-this-very-cool-cat-one-year-ago-and-i-felt-like-v0-usyiocd4wjjc1.jpg?width=482&format=pjpg&auto=webp&s=c51bac1555f38642d4aa93fba4dce34082bfc897'
          }
          alt={drinkType}
          className='absolute h-full w-full rounded-2xl object-cover'
          fill
        />
      </CardContent>
    </Card>
  );
}

export { CoffeeCard };
