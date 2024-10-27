import { BorrowDialog } from '@/components/storage/BorrowDialog';
import { ShoppingCartClearDialog } from '@/components/storage/ShoppingCartClearDialog';
import { ShoppingCartTable } from '@/components/storage/ShoppingCartTable';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function StorageShoppingCartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('storage.shoppingCart');
  const tLoanForm = await getTranslations('storage.loanForm');

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
    email: tLoanForm('email'),
    phoneNumber: tLoanForm('phoneNumber'),
    phoneNumberDescription: tLoanForm('phoneNumberDescription'),
    returnBy: tLoanForm('returnBy'),
    returnByDescription: tLoanForm('returnByDescription'),
    submit: tLoanForm('submit'),
  };

  return (
    <>
      <ShoppingCartTable t={tableMessages} />
      <div className='relative flex flex-col gap-4'>
        <BorrowDialog t={borrowNowMessages} className='sm:mx-auto' />
        <ShoppingCartClearDialog
          t={{
            clearCart: t('clearCart'),
            cancel: t('cancel'),
            clearCartDescription: t('clearCartDescription'),
            clear: t('clear'),
          }}
          className='sm:-translate-y-1/2 sm:absolute sm:top-1/2 sm:right-0'
        />
      </div>
    </>
  );
}
