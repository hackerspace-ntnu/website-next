import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { api } from '@/lib/api/server';

export default async function EditSlidePage({
  params,
}: {
  params: Promise<{ locale: Locale; slideId: string }>;
}) {
  const { locale, slideId } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home.slides.edit');

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const processedSlideId = Number(slideId);
  if (Number.isNaN(processedSlideId) || !Number.isInteger(processedSlideId)) {
    return notFound();
  }

  const slide = await api.home.fetchSlide(processedSlideId);

  if (!slide) {
    return notFound();
  }

  return;
}
