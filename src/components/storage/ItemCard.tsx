import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { AddToCartButton } from '@/components/storage/AddToCartButton';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import type { RouterOutput } from '@/server/api';

async function ItemCard({
  item,
  imageUrl,
  isMember,
}: {
  item: RouterOutput['storage']['fetchMany'][number];
  imageUrl: string | null;
  isMember?: boolean;
}) {
  const t = await getTranslations('storage');
  const tUi = await getTranslations('ui');

  return (
    <Card
      key={item.name}
      className='group rounded-md text-center ring-offset-background duration-200 hover:box-border hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
    >
      <Link
        href={{
          pathname: '/storage/item/[itemId]',
          params: { itemId: item.id },
        }}
        className='block'
      >
        <CardHeader>
          <div className='mx-auto inline-block h-48 w-48 overflow-hidden rounded-md'>
            <Image
              src={imageUrl ?? '/unknown.png'}
              width={192}
              height={192}
              alt={tUi('photoOf', { name: item.name })}
              className='h-full w-full object-cover duration-200 group-hover:scale-105'
              priority={true}
            />
          </div>
          <CardTitle className='mt-2 truncate leading-tight' level='h2'>
            {item.name}
          </CardTitle>
          <CardDescription className='truncate'>
            {item.location}
          </CardDescription>
        </CardHeader>
      </Link>
      <CardFooter className='justify-center gap-2'>
        <p className='text-sm'>
          {t('card.availableUnits', {
            units: item.availableUnits,
            total: item.quantity,
          })}
        </p>
        <AddToCartButton
          item={item}
          t={{
            addToCart: t('card.addToCart'),
            removeFromCart: t('card.removeFromCart'),
            loanInAdvance: t('card.loanInAdvance'),
          }}
          isMember={isMember}
        />
      </CardFooter>
    </Card>
  );
}

export { ItemCard };
