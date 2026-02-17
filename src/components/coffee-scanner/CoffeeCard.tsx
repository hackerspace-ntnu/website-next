'use client';

import Image from 'next/image';
import type { DrinkInfo } from '@/components/coffee-scanner/CoffeeActive';
import { Card, CardContent } from '@/components/ui/Card';
import type { drinkTypes } from '@/lib/constants';
import { cx } from '@/lib/utils';

type CoffeeCardProps = {
  data: DrinkInfo;
  tooMuchChocolate: boolean;
  className?: string;
  onClick: (
    drinkType: (typeof drinkTypes)[number],
    isChocolate: boolean,
  ) => void;
};

function CoffeeCard({
  data,
  tooMuchChocolate,
  className,
  onClick,
}: CoffeeCardProps) {
  const isDisabled = data.isChocolate && tooMuchChocolate;

  const handleClick = () => {
    if (isDisabled) return;
    onClick(data.drinkType, data.isChocolate);
  };

  return (
    <Card
      className={cx(
        'relative m-0 rounded-2xl p-0 active:brightness-50',
        className,
        isDisabled ? 'brightness-50' : 'brightness-100',
      )}
      aria-disabled={isDisabled}
      onClick={handleClick}
    >
      <CardContent className='relative m-0 h-full w-full rounded-2xl p-0'>
        <h2
          className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 font-black uppercase'
          style={{ textShadow: '0px 0px 6px black' }}
        >
          {data.displayText}
        </h2>
        <Image
          src={data.imageSource}
          alt={data.displayText}
          className='absolute h-full w-full rounded-2xl object-contain pt-4 pb-4'
          fill
        />
      </CardContent>
    </Card>
  );
}

export { CoffeeCard };
