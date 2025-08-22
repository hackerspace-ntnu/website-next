import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function ForgotPasswordPage({
  params,
}: PageProps<'/[locale]/auth/forgot-password'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className='flex h-full flex-col transition-opacity duration-500'>
      forgot password page
    </div>
  );
}
