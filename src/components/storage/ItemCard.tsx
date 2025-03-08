import { AddToCartButton } from '@/components/storage/AddToCartButton';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import type { SelectStorageItem } from '@/server/db/tables';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

function ItemCard({
  item,
}: {
  item: SelectStorageItem;
}) {
  const t = useTranslations('storage');
  const tUi = useTranslations('ui');
  return (
    <Card
      key={item.name}
      className='group text-center duration-200 hover:box-border hover:border-primary'
    >
      <Link href={{ pathname: '/storage/item/[id]', params: { id: item.id } }}>
        <CardHeader>
          <div className='mx-auto inline-block overflow-hidden rounded-md'>
            <Image
              src='/unknown.png'
              width={192}
              height={192}
              alt={tUi('photoOf', { name: item.name })}
              className='duration-200 group-hover:scale-105'
              priority={true}
            />
          </div>
          <CardTitle className='mt-2 truncate leading-tight' level='h2'>
            {item.name}
          </CardTitle>
          <CardDescription>{item.location}</CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className='justify-center gap-2'>
        <p className='text-sm'>
          {t('card.quantityInfo', { quantity: item.quantity })}
        </p>
        <AddToCartButton
          item={item}
          t={{
            addToCart: t('card.addToCart'),
            removeFromCart: t('card.removeFromCart'),
          }}
        />
      </CardFooter>
    </Card>
  );
}

export { ItemCard };
