import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { api } from '@/lib/api/server';

export default async function NewSlidePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home.slides.new');

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  return;
}
