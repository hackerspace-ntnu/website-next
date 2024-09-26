import { BorrowNowDialog } from '@/components/storage/BorrowNowDialog';
import { ShoppingCartClearButton } from '@/components/storage/ShoppingCartClearButton';
import { ShoppingCartTable } from '@/components/storage/ShoppingCartTable';
import { Button } from '@/components/ui/Button';
import { Link } from '@/lib/locale/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function StorageShoppingCartPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('storage.shoppingCart');
  const tLoanForm = useTranslations('storage.loanForm');

  const tableMessages = {
    tableDescription: t('tableDescription'),
    productId: t('productId'),
    productName: t('productName'),
    location: t('location'),
    unitsAvailable: t('unitsAvailable'),
    cartEmpty: t('cartEmpty'),
    amountOfItemARIA: t('amountOfItemARIA'),
  };

  const borrowNowMessages = {
    borrowNow: t('borrowNow'),
    name: tLoanForm('name'),
    nameDescription: tLoanForm('nameDescription'),
    email: tLoanForm('email'),
    emailExample: tLoanForm('emailExample'),
    phoneNumber: tLoanForm('phoneNumber'),
    phoneNumberDescription: tLoanForm('phoneNumberDescription'),
    returnBy: tLoanForm('returnBy'),
    returnByDescription: tLoanForm('returnByDescription'),
    submit: tLoanForm('submit'),
  };

  return (
    <>
      <div className='relative'>
        <h1 className='mx-auto my-4 md:text-center'>{t('title')}</h1>
        <Link href='/storage'>
          <Button
            className='-translate-y-1/2 absolute top-1/2 left-0 flex gap-2'
            variant='ghost'
          >
            <ArrowLeftIcon />
            {t('backToStorage')}
          </Button>
        </Link>
      </div>
      <ShoppingCartTable t={tableMessages} />
      <div className='relative my-4'>
        <BorrowNowDialog t={borrowNowMessages} className='mx-auto block' />
        <ShoppingCartClearButton
          className='-translate-y-1/2 absolute top-1/2 right-3'
          caption={t('clearCart')}
        />
      </div>
    </>
  );
}
