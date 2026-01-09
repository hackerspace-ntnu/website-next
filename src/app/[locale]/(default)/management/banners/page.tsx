import { ArrowLeftIcon, EditIcon, PlusIcon } from 'lucide-react';
import type { Locale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { BannerActiveCheckbox } from '@/components/management/banners/BannerActiveCheckbox';
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

export default async function BannersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('management.banners');
  const tManagement = await getTranslations('management');
  const formatter = await getFormatter();

  const { user } = await api.auth.state();

  if (!user?.groups.some((g) => ['leadership', 'admin'].includes(g))) {
    // TODO: Actually return a HTTP 401 Unauthorized response whenever `unauthorized.tsx` is stable
    return <ErrorPageContent message={t('unauthorized')} />;
  }

  const banners = await api.banners.fetchAllBanners();

  return (
    <>
      <Link
        href='/management'
        className='mb-4 flex w-fit gap-2'
        variant='ghost'
        size='default'
        aria-label={tManagement('backToManagement')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {tManagement('backToManagement')}
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('content')}</TableHead>
            <TableHead>{t('pages')}</TableHead>
            <TableHead>{t('expiresAt')}</TableHead>
            <TableHead>{t('active')}</TableHead>
            <TableHead>
              <Link
                href='/management/banners/new'
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
          {banners.map((banner) => {
            const bannerLocalization = banner.localizations.find(
              (localization) => localization.locale === locale,
            );
            return (
              <TableRow key={banner.id}>
                <TableCell>{bannerLocalization?.content}</TableCell>
                <TableCell>{banner.pagesMatch}</TableCell>
                <TableCell>
                  {banner.expiresAt
                    ? formatter.dateTime(banner.expiresAt, {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })
                    : '-'}
                </TableCell>
                <TableCell>
                  <BannerActiveCheckbox
                    banner={banner}
                    t={{
                      changingToActive: t('api.changingActive', {
                        active: 'true',
                      }),
                      changingToInactive: t('api.changingActive', {
                        active: 'false',
                      }),
                      successfullyChangedToActive: t(
                        'api.successChangeActive',
                        {
                          active: 'true',
                        },
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
                      pathname: '/management/banners/[bannerId]/edit',
                      params: { bannerId: banner.id },
                    }}
                    variant='default'
                    size='icon'
                    aria-label={t('editBanner')}
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
