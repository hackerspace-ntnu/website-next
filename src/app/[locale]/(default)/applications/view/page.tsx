import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('applications.view');

  return {
    title: t('title'),
  };
}

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('applications.view');
  const applications = await api.applications.fetchApplications();
  const formatter = await getFormatter();

  const { user } = await api.auth.state();

  const canViewAll =
    user?.groups.includes('admin') || user?.groups.includes('leadership');

  if (!applications) return notFound();

  return (
    <>
      <Link
        className='flex w-fit items-center gap-2'
        href='/'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        {t('backToHome')}
      </Link>
      <h1 className='mb-6 text-center'>{t('title')}</h1>
      {applications.length === 0 && (
        <>
          <h4 className='mb-4 text-center'>{t('noPending')}</h4>
          {!canViewAll && (
            <p className='text-center text-muted-foreground text-sm'>
              {t('noPendingDescription')}
            </p>
          )}
        </>
      )}
      <div className='grid gap-4 md:grid-cols-2'>
        {applications.map((application) => (
          <Link
            key={application.id}
            href={{
              pathname: '/applications/view/[appId]',
              params: { appId: application.id },
            }}
            variant='none'
            size='none'
          >
            <Card>
              <CardHeader>
                <CardTitle>{t('application')}</CardTitle>
                <CardDescription>
                  {application.group.localization?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t('submittedBy', { name: application.name })}</p>
              </CardContent>
              <CardFooter className='text-muted-foreground text-sm'>
                {formatter.dateTime(application.createdAt, {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
