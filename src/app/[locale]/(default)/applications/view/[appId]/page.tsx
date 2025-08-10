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
import { ExternalLink, Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('applications.view');

  return {
    title: t('title'),
  };
}

export default async function ApplicationsViewPage({
  params,
}: {
  params: Promise<{ locale: Locale; appId: string }>;
}) {
  const { locale, appId } = await params;
  setRequestLocale(locale);

  if (Number.isNaN(Number(appId))) return notFound();

  const t = await getTranslations('applications.view');
  const tApply = await getTranslations('applications.apply');
  const formatter = await getFormatter();

  const application = await api.applications.fetchApplication({
    applicationId: Number(appId),
  });

  const groupLocalization = application?.group.localizations.find(
    (loc) => loc.locale === locale,
  );

  if (!application) return notFound();

  return (
    <div className='[&>h2]:my-2 [&>h2]:text-2xl [&>p]:max-w-prose'>
      <Link
        className='flex w-fit items-center gap-2'
        href='/applications/view'
        variant='ghost'
        size='default'
      >
        <ArrowLeftIcon />
        {t('backToApplications')}
      </Link>
      <h1 className='mb-6'>{t('application')}</h1>
      <h2 className='my-2'>{t('userInfo')}</h2>
      <div className='space-y-2'>
        <p>{t('submittedBy', { name: application.name })}</p>
        <p>
          {t.rich('email', {
            email: application.email,
            link: () => (
              <ExternalLink href={`mailto:${application.email}`}>
                {application.email}
              </ExternalLink>
            ),
          })}
        </p>
        <p>
          {t.rich('phoneNumber', {
            phone: application.phoneNumber,
            link: () => (
              <ExternalLink href={`tel:${application.phoneNumber}`}>
                {application.phoneNumber}
              </ExternalLink>
            ),
          })}
        </p>
        <p>{t('studyProgram', { program: application.studyProgram })}</p>
        <p>{t('studyYear', { year: application.studyYear })}</p>
        <p>
          {t('submittedAt', {
            date: formatter.dateTime(application.createdAt, {
              dateStyle: 'short',
              timeStyle: 'short',
            }),
          })}
        </p>
      </div>
      <h2>{tApply('groupIdentifier.label')}</h2>
      <p>{groupLocalization?.name ?? application.group.id}</p>
      <h2>{tApply('learnedAboutUsHow.label')}</h2>
      <p>{application.learnedAboutUsHow}</p>
      <h2>{tApply('about.label')}</h2>
      <p>{application.about}</p>
      <h2>{tApply('motivation.label')}</h2>
      <p>{application.motivation}</p>
      <h2>{tApply('otherProjects.label')}</h2>
      <p>{application.otherProjects}</p>
    </div>
  );
}
