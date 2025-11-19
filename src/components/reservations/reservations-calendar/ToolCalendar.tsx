'use client';

import { createCalendarConfig } from '@/components/reservations/reservations-calendar/CalendarConfig';
import { CalendarDialog } from '@/components/reservations/reservations-calendar/CalendarDialog';
import { CustomEventContent } from '@/components/reservations/reservations-calendar/CustomEventContent';
import { CustomToolbar } from '@/components/reservations/reservations-calendar/CustomToolbar';
import { InformationCard } from '@/components/reservations/reservations-calendar/InformationCard';
import { ToolCalendarSkeleton } from '@/components/reservations/reservations-calendar/ToolCalendarSkeleton';
import { Button } from '@/components/ui/Button';
import { Link } from '@/components/ui/Link';
import { api } from '@/lib/api/client';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import '@/lib/styles/calendar.css';
import type {
  DateSelectArg,
  DatesSetArg,
  EventContentArg,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { keepPreviousData } from '@tanstack/react-query';
import { EditIcon, PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from '@/components/ui/Toaster';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';
import { useRouter } from '@/lib/locale/navigation';
import type { RouterOutput } from '@/server/api';

type ToolCalendarProps = {
  tool: NonNullable<RouterOutput['tools']['fetchTool']>;
  user: RouterOutput['auth']['state']['user'];
};
type CalendarReservation =
  RouterOutput['reservations']['fetchCalendarReservations'][number];
type Range = { fromISO: string; untilISO: string };

function isFinished(reservedUntil: Date | string) {
  const end =
    reservedUntil instanceof Date ? reservedUntil : new Date(reservedUntil);
  return end.getTime() <= Date.now();
}

function reservationToCalendarEvent(r: CalendarReservation) {
  return {
    id: String(r.reservationId),
    start: new Date(r.reservedFrom),
    end: new Date(r.reservedUntil),
    extendedProps: {
      reservationId: r.reservationId,
      userId: r.userId,
      name: r.name,
      phoneNr: r.phoneNr,
      email: r.email,
      notes: r.notes,
      toolId: r.toolId,
      finished: isFinished(r.reservedUntil),
    },
  } as const;
}

function ToolCalendar({ tool, user }: ToolCalendarProps) {
  const t = useTranslations('reservations');
  const router = useRouter();

  const isLaptop = useMediaQuery('(min-width: 70rem)');
  const isIpad = useMediaQuery('(min-width: 41.438rem)');

  const [range, setRange] = useState<Range | null>(null);
  const debouncedSetRange = useDebounceCallback(setRange, 500);
  const calendarRef = useRef<FullCalendar>(null);
  const calendarApi = calendarRef.current?.getApi();

  // Used when creating a new reservation
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  // Decide automatic view
  useEffect(() => {
    const next = isLaptop
      ? 'timeGridWeek'
      : isIpad
        ? 'timeGridThreeDay'
        : 'timeGridDay';

    if (!calendarApi || calendarApi.view.type === next) return;
    queueMicrotask(() => calendarApi.changeView(next, new Date()));
  }, [isLaptop, isIpad, calendarApi]);

  // ---------- Data fetching ----------
  const reservationsQuery = api.reservations.fetchCalendarReservations.useQuery(
    {
      toolId: tool.id,
      from: range?.fromISO ?? '',
      until: range?.untilISO ?? '',
    },
    {
      enabled: !!range,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  );

  const calendarReservations = useMemo(
    () => (reservationsQuery.data ?? []).map(reservationToCalendarEvent),
    [reservationsQuery.data],
  );

  // ---------- UI handlers ----------
  const requirePhoneNumber = useCallback(() => {
    if (!user?.phoneNumber || user.phoneNumber.length === 0) {
      toast.error(t('form.phoneNumberRequired'), {
        action: {
          label: t('form.setPhoneNumber'),
          onClick: () => router.push('/settings/account'),
        },
      });
      return false;
    }
    return true;
  }, [router, t, user]);

  const handleSelectSlot = useCallback(
    (info: DateSelectArg) => {
      calendarApi?.unselect();
      if (!requirePhoneNumber()) return;
      setSelectedSlot({ start: info.start, end: info.end });
    },
    [requirePhoneNumber, calendarApi],
  );

  const handleDatesSet = useCallback(
    (info: DatesSetArg) => {
      debouncedSetRange({
        fromISO: info.view.activeStart.toISOString(),
        untilISO: info.view.activeEnd.toISOString(),
      });
    },
    [debouncedSetRange],
  );

  const renderEventContent = useCallback(
    (eventInfo: EventContentArg) =>
      eventInfo.event.extendedProps.userId === user?.id && !eventInfo.isPast ? (
        <CalendarDialog
          mode='edit'
          user={user}
          calendarRef={calendarRef}
          toolId={eventInfo.event.extendedProps.toolId}
          reservationId={eventInfo.event.extendedProps.reservationId}
          range={{
            start: eventInfo.event.start,
            end: eventInfo.event.end,
          }}
          notes={eventInfo.event.extendedProps.notes ?? ''}
        >
          <CustomEventContent eventInfo={eventInfo} user={user} />
        </CalendarDialog>
      ) : (
        <CustomEventContent eventInfo={eventInfo} user={user} />
      ),
    [user],
  );

  const calendarConfig = useMemo(() => {
    return createCalendarConfig({
      user,
      isLaptop,
      isIpad,
      handleDatesSet,
      handleSelectSlot,
      t: { week: t('toolbar.week') },
    });
  }, [user, isLaptop, isIpad, handleDatesSet, handleSelectSlot, t]);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center overscroll-none'>
      <div className='relative flex w-full justify-center'>
        <Button
          variant={user ? 'default' : 'secondary'}
          className='mb-3'
          onClick={() => {
            if (!requirePhoneNumber()) return;
            setSelectedSlot({ start: new Date(), end: new Date() });
          }}
          disabled={!user || !range || reservationsQuery.isLoading}
        >
          <PlusIcon className='mr-2 size-5' />
          {user
            ? t('calendar.createButton')
            : t('calendar.createButtonLoggedOut')}
        </Button>
        {user?.groups.some((g) =>
          ['labops', 'management', 'admin'].includes(g),
        ) && (
          <Link
            href={{
              pathname: '/reservations/tools/[toolId]/edit',
              params: { toolId: tool.id },
            }}
            variant='default'
            size='icon'
            className='absolute top-0 right-0'
          >
            <EditIcon />
          </Link>
        )}
      </div>

      {selectedSlot && (
        <CalendarDialog
          open
          onOpenChange={(open) => !open && setSelectedSlot(null)}
          mode='create'
          user={user}
          calendarRef={calendarRef}
          toolId={tool.id}
          range={{
            start: selectedSlot.start,
            end: selectedSlot.end,
          }}
        />
      )}

      <div className='relative w-full overflow-hidden rounded-lg border border-border bg-background text-foreground'>
        <InformationCard />
        <CustomToolbar
          calendarRef={calendarRef}
          isLaptop={isLaptop}
          isIpad={isIpad}
        />
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          events={calendarReservations}
          locale={t('calendar.locale')}
          eventContent={renderEventContent}
          {...calendarConfig}
        />
        {(!range || reservationsQuery.isLoading) && (
          <div className='pointer-events-none absolute inset-0 z-10'>
            <ToolCalendarSkeleton />
          </div>
        )}
      </div>
    </div>
  );
}

export { ToolCalendar };
