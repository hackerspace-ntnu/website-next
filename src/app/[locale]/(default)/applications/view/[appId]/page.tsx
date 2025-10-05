import { ArrowLeftIcon } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from 'next-intl';
import {
  getFormatter,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { DeleteApplicationButton } from '@/components/applications/DeleteApplicationButton';
import { ExternalLink, Link } from '@/components/ui/Link';
import { api } from '@/lib/api/server';

export async function generateMetadata() {
  const t = await getTranslations('applications.view');

  return {
    title: t('application'),
  };
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ locale: Locale; appId: string }>;
}) {
  const { locale, appId } = await params;
  setRequestLocale(locale);

  const processedAppId = Number(appId);
  if (
    Number.isNaN(processedAppId) ||
    !Number.isInteger(processedAppId) ||
    processedAppId < 1
  )
    return notFound();

  const t = await getTranslations('applications.view');
  const tUi = await getTranslations('ui');
  const tApply = await getTranslations('applications.apply');
  const formatter = await getFormatter();

  const application = await api.applications.fetchApplication({
    applicationId: processedAppId,
  });

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
        <p>
          {t('studyYear', {
            year:
              application.studyYear === 'other'
                ? tApply('studyYear.other')
                : application.studyYear,
          })}
        </p>
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
      <p>{application.group.localization?.name ?? application.group.id}</p>
      <h2>{tApply('learnedAboutUsHow.label')}</h2>
      <p>{application.learnedAboutUsHow}</p>
      <h2>{tApply('about.label')}</h2>
      <p>{application.about}</p>
      <h2>{tApply('motivation.label')}</h2>
      <p>{application.motivation}</p>
      <h2>{tApply('otherProjects.label')}</h2>
      <p>{application.otherProjects}</p>
      <DeleteApplicationButton
        applicationId={application.id}
        t={{
          label: t('deleteApplication'),
          dialogTitle: t('deleteApplicationTitle'),
          dialogDescription: t('deleteApplicationDescription'),
          cancel: tUi('cancel'),
          delete: tUi('delete'),
          success: t('applicationDeleted'),
        }}
      />
    </div>
  );
}
