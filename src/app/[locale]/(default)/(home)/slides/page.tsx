import { EditIcon } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { api } from '@/lib/api/server';

export default async function SlidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const tHome = await getTranslations('home');
  const t = await getTranslations('home.slides');

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const slides = await api.home.fetchSlides();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t('image')}</TableHead>
          <TableHead>{t('overlay')}</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {slides.map((slide) => {
          const slideLocalization = slide.localizations.find(
            (localization) => localization.locale === locale,
          );
          return (
            <TableRow key={slide.id}>
              <TableCell>
                <Image
                  src={slide.imageUrl ?? '/bg.jpg'}
                  alt={slideLocalization?.imgAlt ?? tHome('placeholderAlt')}
                  width={160}
                  height={90}
                  className='object-contain'
                />
              </TableCell>
              <TableCell className='flex flex-col gap-3'>
                <span>{slideLocalization?.heading}</span>
                <span>{slideLocalization?.description}</span>
              </TableCell>
              <TableCell>
                <EditIcon />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
