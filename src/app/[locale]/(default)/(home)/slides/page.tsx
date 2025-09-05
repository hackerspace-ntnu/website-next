import { EditIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SlideActiveCheckbox } from '@/components/home/SlideActiveCheckbox';
import { Link } from '@/components/ui/Link';
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
  setRequestLocale(locale);

  const tHome = await getTranslations('home');
  const t = await getTranslations('home.slides');

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized reponse whenever `unauthorized.tsx` is stable
    throw new Error(t('unauthorized'));
  }

  const slides = await api.home.fetchSlides({});

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='min-w-48'>{t('image')}</TableHead>
          <TableHead className='w-full'>{t('overlay')}</TableHead>
          <TableHead className='min-w-20'>{t('active')}</TableHead>
          <TableHead className='min-w-20'>
            <Link
              href='/slides/new'
              variant='default'
              size='icon'
              className='my-2'
              aria-label={t('create')}
            >
              <PlusIcon />
            </Link>
          </TableHead>
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
                <SlideActiveCheckbox
                  slide={slide}
                  t={{
                    successfullyChangedToActive: tHome(
                      'api.successChangeActive',
                      { active: 'true' },
                    ),
                    successfullyChangedToInactive: tHome(
                      'api.successChangeActive',
                      { active: 'false' },
                    ),
                  }}
                />
              </TableCell>
              <TableCell>
                <Link
                  href={{
                    pathname: '/slides/[slideId]/edit',
                    params: { slideId: slide.id },
                  }}
                  variant='default'
                  size='icon'
                  aria-label={t('editSlide')}
                >
                  <EditIcon />
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
