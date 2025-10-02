import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { BorrowDialog } from '@/components/storage/BorrowDialog';
import { ShoppingCartClearDialog } from '@/components/storage/ShoppingCartClearDialog';
import { ShoppingCartTable } from '@/components/storage/ShoppingCartTable';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('storage');

  return {
    title: `${t('title')}: ${t('shoppingCart.title')}`,
  };
}

export default async function StorageShoppingCartPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
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
    amountOfItemAria: t('amountOfItemAria'),
  };

  const requestLoanMessages = {
    title: t('requestLoan'),
    loanPeriod: tLoanForm('loanPeriod'),
    loanPeriodDescription: tLoanForm('loanPeriodDescription'),
    autoapprove: tLoanForm('autoapprove'),
    autoapproveDescription: tLoanForm('autoapproveDescription'),
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
            t={requestLoanMessages}
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
