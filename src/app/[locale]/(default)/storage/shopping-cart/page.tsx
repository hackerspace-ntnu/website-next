import { LoanForm } from '@/components/storage/LoanForm';
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

  const loanFormMessages = {
    borrowNow: tLoanForm('borrowNow'),
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
      <h1 className='my-4 md:text-center'>{t('title')}</h1>
      <ShoppingCartTable t={tableMessages} />
      <div className='my-4 flex justify-center gap-2'>
        <Link href='/storage'>
          <Button className='flex gap-2'>
            <ArrowLeftIcon />
            {t('backToStorage')}
          </Button>
        </Link>
        <ShoppingCartClearButton caption={t('clearCart')} />
      </div>
      <div className='my-6'>
        <LoanForm t={loanFormMessages} />
      </div>
    </>
  );
}
