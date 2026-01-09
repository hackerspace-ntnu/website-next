import { TRPCError } from '@trpc/server';
import {
  ArrowLeftIcon,
  CalendarIcon,
  EditIcon,
  MapPinIcon,
} from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { type Locale, type Messages, NextIntlClientProvider } from 'next-intl';
import {
  getFormatter,
  getLocale,
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { ParticipantsTable } from '@/components/events/ParticipantsTable';
import { SignUpButton } from '@/components/events/SignUpButton';
import { WaitlistTable } from '@/components/events/WaitlistTable';
import { ErrorPageContent } from '@/components/layout/ErrorPageContent';
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Link } from '@/components/ui/Link';
import { PlateEditorView } from '@/components/ui/plate/PlateEditorView';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import type { RouterOutput } from '@/server/api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const locale = await getLocale();
  const processedEventId = Number(eventId);

  if (
    !eventId ||
    Number.isNaN(processedEventId) ||
    !Number.isInteger(processedEventId)
  ) {
    return notFound();
  }

  let event: RouterOutput['events']['fetchEvent'] | null = null;

  try {
    event = await api.events.fetchEvent(processedEventId);
  } catch {
    return;
  }

  const localization = event?.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!event || !localization) return;

  return {
    title: `${localization.name}`,
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; eventId: string }>;
}) {
  const { locale, eventId } = await params;
  setRequestLocale(locale as Locale);

  const formatter = await getFormatter();
  const formatterOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  } as const;
  const t = await getTranslations('events');
  const tLayout = await getTranslations('layout');
  const { ui, events } = await getMessages();
  const processedEventId = Number(eventId);

  if (
    !eventId ||
    Number.isNaN(processedEventId) ||
    !Number.isInteger(processedEventId)
  ) {
    return notFound();
  }

  let event: RouterOutput['events']['fetchEvent'] | null = null;

  try {
    event = await api.events.fetchEvent(processedEventId);
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code !== 'FORBIDDEN') console.error(error);
      if (['INTERNAL_SERVER_ERROR', 'FORBIDDEN'].includes(error.code)) {
        return (
          <ErrorPageContent
            message={
              error.code === 'FORBIDDEN'
                ? t('api.unauthorized')
                : t('api.fetchEventFailed')
            }
          />
        );
      }
    }
  }

  const localization = event?.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!event || !localization) return notFound();

  const { user } = await api.auth.state();

  const signUpInfo = user ? await api.events.fetchUserSignUp(event.id) : null;

  const canEdit = user?.groups.some((group) =>
    ['labops', 'leadership', 'admin'].includes(group),
  );

  const imageUrl = event.imageId
    ? await api.utils.getFileUrl({ fileId: event.imageId })
    : undefined;

  return (
    <>
      <Link
        href='/events'
        className='my-4 flex w-fit gap-2'
        variant='secondary'
        size='default'
        aria-label={t('backToEvents')}
      >
        <ArrowLeftIcon aria-hidden='true' />
        {t('backToEvents')}
      </Link>
      <div className='relative'>
        <h1 className='my-4'>{localization.name}</h1>
        <div className='absolute right-0 xs:right-5 bottom-0 flex gap-2'>
          {canEdit && (
            <Link
              variant='default'
              size='icon'
              href={{ pathname: '/events/[eventId]/edit', params: { eventId } }}
            >
              <EditIcon />
            </Link>
          )}
        </div>
      </div>
      <h2 className='border-b-0 text-2xl'>{localization.summary}</h2>
      <div className='mt-4 space-y-4'>
        {event.internal && (
          <Badge className='rounded-full'>{tLayout('internal')}</Badge>
        )}
        <div className='flex items-center gap-2'>
          <CalendarIcon className='h-8 w-8' />
          {formatter.dateTimeRange(
            event.startTime,
            event.endTime,
            formatterOptions,
          )}
        </div>
        {event.locationMapLink ? (
          <ExternalLink
            className='group flex w-fit items-center gap-2'
            variant='link'
            href={event.locationMapLink}
          >
            <MapPinIcon className='h-8 w-8 text-foreground group-hover:text-primary' />
            <span>{localization.location}</span>
          </ExternalLink>
        ) : (
          <div className='flex items-center gap-2'>
            <MapPinIcon className='h-8 w-8' />
            <span>{localization.location}</span>
          </div>
        )}
        {event.skill && (
          <>
            <Separator />
            <span className='text-muted-foreground'>
              {t('attendanceGivesSkill')}
            </span>
            <div className='mt-4 flex items-center gap-2'>
              <SkillIcon skill={event.skill} size='xl' />
              {locale === 'en-GB'
                ? event.skill?.nameEnglish
                : event.skill?.nameNorwegian}
            </div>
          </>
        )}
        <Separator />
        <NextIntlClientProvider
          messages={{ ui, events } as Pick<Messages, 'ui' | 'events'>}
        >
          <div className='flex flex-col-reverse items-center gap-6 md:flex-row md:justify-between'>
            <div className='w-prose'>
              <PlateEditorView value={localization.description} />
              <SignUpButton event={event} signUpInfo={signUpInfo} user={user} />
              <p className='mb-2'>
                {t('attendance.signUpDeadline', {
                  date: event.signUpDeadline
                    ? formatter.dateTime(event.signUpDeadline, formatterOptions)
                    : formatter.dateTime(event.startTime, formatterOptions),
                })}
              </p>
              {!event.maxParticipants ? (
                <p>
                  {t('attendance.signedUpTotal', {
                    count: event.participantsCount,
                  })}
                </p>
              ) : (
                <>
                  <p className='mb-4'>
                    {t('attendance.signedUpTotalWithMax', {
                      count:
                        event.participantsCount - event.participantsWaitlisted,
                      max: event.maxParticipants,
                    })}
                  </p>
                  {event.participantsWaitlisted !== 0 && (
                    <p>
                      {t('attendance.waitlistTotal', {
                        count: event.participantsWaitlisted,
                      })}
                    </p>
                  )}
                </>
              )}
            </div>
            {imageUrl && (
              <div className='relative h-96 w-full max-w-144'>
                <Image
                  src={imageUrl}
                  fill
                  className='rounded-lg object-contain lg:object-cover'
                  alt=''
                />
              </div>
            )}
          </div>
          {canEdit && (
            <>
              <Separator />
              <h2>{t('attendance.attendance')}</h2>
              <p className='text-muted-foreground text-sm'>
                {t('attendance.attendanceDescription')}
              </p>
              <ParticipantsTable event={event} />
              <Separator />
              <h3>{t('waitlist.name')}</h3>
              <WaitlistTable event={event} />
            </>
          )}
        </NextIntlClientProvider>
      </div>
    </>
  );
}
