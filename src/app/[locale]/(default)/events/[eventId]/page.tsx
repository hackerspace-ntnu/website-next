import { and, eq } from 'drizzle-orm';
import {
  ArrowLeftIcon,
  BookImageIcon,
  CalendarIcon,
  EditIcon,
  MapPinIcon,
} from 'lucide-react';
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
import { SkillIcon } from '@/components/skills/SkillIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { ExternalLink, Link } from '@/components/ui/Link';
import { PlateEditorView } from '@/components/ui/plate/PlateEditorView';
import { Separator } from '@/components/ui/Separator';
import { api } from '@/lib/api/server';
import { db } from '@/server/db';
import { eventLocalizations } from '@/server/db/tables';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const locale = await getLocale();
  if (Number.isNaN(Number(eventId))) return;
  const localization = await db.query.eventLocalizations.findFirst({
    where: and(
      eq(eventLocalizations.eventId, Number(eventId)),
      eq(eventLocalizations.locale, locale),
    ),
  });

  if (!localization?.name) return;

  return {
    title: `${localization.name}`,
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ locale: Locale; eventId: string }>;
}) {
  const { locale, eventId } = await params;
  setRequestLocale(locale);

  const formatter = await getFormatter();
  const formatterOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  } as const;
  const t = await getTranslations('events');
  const tLayout = await getTranslations('layout');
  const { ui, events } = await getMessages();
  if (Number.isNaN(Number(eventId))) return notFound();

  const event = await api.events.fetchEvent(Number(eventId));

  const localization = event?.localizations.find(
    (localization) => localization.locale === locale,
  );

  if (!event || !localization) return notFound();

  const { user } = await api.auth.state();

  const signedUp = user ? await api.events.isSignedUpToEvent(event.id) : false;

  const canEdit = user?.groups.some((group) =>
    ['labops', 'leadership', 'admin'].includes(group),
  );
  const participants = canEdit
    ? await api.events.fetchEventParticipants(Number(eventId))
    : [];

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
            <MapPinIcon className='h-8 w-8 text-black group-hover:text-primary dark:text-white' />
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
            <div className='max-w-prose'>
              <PlateEditorView value={localization.description} />
              <SignUpButton
                event={event}
                signedUp={signedUp}
                disabled={!user}
              />
              <p>
                {t('attendance.signUpDeadline', {
                  date: event.signUpDeadline
                    ? formatter.dateTime(event.signUpDeadline, formatterOptions)
                    : formatter.dateTime(event.startTime, formatterOptions),
                })}
              </p>
            </div>
            <Avatar className='h-48 w-48'>
              <AvatarImage src={imageUrl} alt='' className='object-cover' />
              <AvatarFallback>
                <BookImageIcon />
              </AvatarFallback>
            </Avatar>
          </div>
          {canEdit && (
            <>
              <Separator />
              <h2>{t('attendance.attendance')}</h2>
              <p className='text-muted-foreground text-sm'>
                {t('attendance.attendanceDescription')}
              </p>
              <ParticipantsTable participants={participants} event={event} />
            </>
          )}
        </NextIntlClientProvider>
      </div>
    </>
  );
}
