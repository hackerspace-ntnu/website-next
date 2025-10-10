import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('auth');

  return {
    title: t('forgotPassword'),
  };
}

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className='flex h-full flex-col transition-opacity duration-500'>
      forgot password page
    </div>
  );
}
