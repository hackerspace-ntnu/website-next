import type { StorageItem } from '@/components/storage/AddToCartButton';
import { AddToCartButton } from '@/components/storage/AddToCartButton';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

type ItemCardProps = {
  item: StorageItem;
  addToCart: string;
  removeFromCart: string;
  quantityInfo: string;
};

function ItemCard({
  item,
  addToCart,
  removeFromCart,
  quantityInfo,
}: ItemCardProps) {
  const t = useTranslations('ui');
  return (
    <Card
      key={item.name}
      className='group text-center duration-200 hover:box-border hover:border-primary'
    >
      <CardHeader>
        <div className='mx-auto inline-block overflow-hidden rounded-md'>
          <Image
            src='/unknown.png'
            width={192}
            height={192}
            alt={t('photoOf', { name: item.name })}
            className='duration-200 group-hover:scale-105'
            priority={true}
          />
        </div>
        <CardTitle className='mt-2 truncate leading-tight'>
          {item.name}
        </CardTitle>
        <CardDescription className='flex flex-col gap-1'>
          <span>{item.location}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className='justify-center gap-2'>
        <span className='text-sm'>{quantityInfo}</span>
        <AddToCartButton
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </CardFooter>
    </Card>
  );
}

export { ItemCard };
