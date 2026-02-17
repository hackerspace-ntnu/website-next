'use client';

import Image from 'next/image';
import type { DrinkInfo } from '@/components/coffee-scanner/CoffeeActive';
import { Card, CardContent } from '@/components/ui/Card';
import { cx } from '@/lib/utils';

type CoffeeCardProps = {
  data: DrinkInfo;
  tooMuchChocolate: boolean;
  className?: string;
};

function CoffeeCard({ data, tooMuchChocolate, className }: CoffeeCardProps) {
  const isDisabled = data.isChocolate && tooMuchChocolate;

  const handleClick = () => {
    // TODO sent api request.
  };

  return (
    <Card
      className={cx(
        'relative m-0 rounded-2xl p-0 active:brightness-50',
        className,
        isDisabled ? 'brightness-50' : 'brightness-100',
      )}
    >
      <CardContent className='relative m-0 h-full w-full rounded-2xl p-0'>
        <h2
          className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 font-black uppercase'
          style={{ textShadow: '0px 4px 3px black' }}
        >
          {data.displayText}
        </h2>
        <Image
          src={data.imageSource}
          alt={data.displayText}
          className='absolute h-full w-full rounded-2xl object-cover'
          fill
        />
      </CardContent>
    </Card>
  );
}

export { CoffeeCard };
