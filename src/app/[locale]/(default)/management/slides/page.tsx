import { ArrowLeftIcon, EditIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import type { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { SlideActiveCheckbox } from '@/components/management/slides/SlideActiveCheckbox';
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management.slides');
  const tManagement = await getTranslations('management');

  const { user } = await api.auth.state();

  if (!user?.groups.includes('admin')) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const slides = await api.slides.fetchSlides({});

  return (
    <>
      <Link
        href='/management'
        className='my-4 flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={tManagement('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {tManagement('backToManagement')}
      </Link>
      <h1 className='my-4 text-center'>{t('title')}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-48'>{t('image')}</TableHead>
            <TableHead className='w-full'>{t('overlay')}</TableHead>
            <TableHead className='min-w-20'>{t('active')}</TableHead>
            <TableHead className='min-w-20'>
              <Link
                href='/management/slides/new'
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
                    alt={slideLocalization?.imgAlt ?? t('placeholderAlt')}
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
                      changingToActive: t('api.changingActive', {
                        active: 'true',
                      }),
                      changingToInactive: t('api.changingActive', {
                        active: 'false',
                      }),
                      successfullyChangedToActive: t(
                        'api.successChangeActive',
                        { active: 'true' },
                      ),
                      successfullyChangedToInactive: t(
                        'api.successChangeActive',
                        { active: 'false' },
                      ),
                      errorChangingToActive: t('api.errorChangingActive', {
                        active: 'true',
                      }),
                      errorChangingToInactive: t('api.errorChangingActive', {
                        active: 'false',
                      }),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    href={{
                      pathname: '/management/slides/[slideId]/edit',
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
    </>
  );
}
