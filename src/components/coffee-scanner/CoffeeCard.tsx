'use client';

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
        <h2
          className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 font-black uppercase'
          style={{ textShadow: '0px 4px 3px black' }}
        >
          {drinkType}
        </h2>
        <Image
          src={imgSource}
          alt={drinkType}
          className='absolute h-full w-full rounded-2xl object-cover'
          fill
        />
      </CardContent>
    </Card>
  );
}

export { CoffeeCard };
