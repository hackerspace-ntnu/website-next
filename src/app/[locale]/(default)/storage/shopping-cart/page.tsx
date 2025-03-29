import { BorrowDialog } from '@/components/storage/BorrowDialog';
import { ShoppingCartClearDialog } from '@/components/storage/ShoppingCartClearDialog';
import { ShoppingCartTable } from '@/components/storage/ShoppingCartTable';
import { api } from '@/lib/api/server';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

export default async function StorageShoppingCartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('storage.shoppingCart');
  const tUi = await getTranslations('ui');
  const tLoanForm = await getTranslations('storage.loanForm');
  const { storage, ui } = await getMessages();

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
    mustbeLoggedIn: t('mustBeLoggedIn'),
    success: tLoanForm('success'),
  };

  const { user } = await api.auth.state();

  return (
    <>
      <ShoppingCartTable t={tableMessages} />
      <div className='relative flex flex-col gap-4'>
        <NextIntlClientProvider
          messages={{ storage, ui } as Pick<Messages, 'storage' | 'ui'>}
        >
          <BorrowDialog
            t={borrowNowMessages}
            className='sm:mx-auto'
            isLoggedIn={!!user}
          />
        </NextIntlClientProvider>
        <ShoppingCartClearDialog
          t={{
            clearCart: t('clearCart'),
            cancel: tUi('cancel'),
            clearCartDescription: t('clearCartDescription'),
            clear: t('clear'),
          }}
        />
      </div>
    </>
  );
}
