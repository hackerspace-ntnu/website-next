'use client';

import { createCalendarConfig } from '@/components/reservations/reservations-calendar/CalendarConfig';
import { CalendarDialog } from '@/components/reservations/reservations-calendar/CalendarDialog';
import { CustomEventContent } from '@/components/reservations/reservations-calendar/CustomEventContent';
import CustomToolbar from '@/components/reservations/reservations-calendar/CustomToolbar';
import { InformationCard } from '@/components/reservations/reservations-calendar/InformationCard';
import { ToolCalendarSkeleton } from '@/components/reservations/reservations-calendar/ToolCalendarSkeleton';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api/client';
import { useDebounceCallback } from '@/lib/hooks/useDebounceCallback';
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
import { Link } from '@/components/ui/Link';
import type { RouterOutput, RouterOutputs } from '@/server/api';

type ToolCalendarProps = {
  tool: NonNullable<RouterOutput['tools']['fetchTool']>;
  user: RouterOutputs['auth']['state']['user'];
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
  const isLoggedIn = !!user;
  const isMember = user?.groups && user.groups.length > 0;
  const memberId = user?.id ?? 0;
  const isLaptop = useMediaQuery('(min-width: 70rem)');
  const isIpad = useMediaQuery('(min-width: 41.438rem)');

  const [view, setView] = useState<{
    name: string;
    snapToToday: boolean;
    manual: boolean;
  } | null>(null);
  const [range, setRange] = useState<Range | null>(null);
  const debouncedSetRange = useDebounceCallback(setRange, 500);
  const calendarRef = useRef<FullCalendar>(null);

  // Used when creating a new reservation
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  // Decide initial/auto view
  useEffect(() => {
    if (view?.manual) return;

    const next = isLaptop
      ? 'timeGridWeek'
      : isIpad
        ? 'timeGridThreeDay'
        : 'timeGridDay';

    setView({
      name: next,
      snapToToday: next === 'timeGridDay' || next === 'timeGridThreeDay',
      manual: false,
    });
  }, [isLaptop, isIpad, view?.manual]);

  // ---------- Data fetching ----------
  const reservationsQuery = api.reservations.fetchCalendarReservations.useQuery(
    {
      toolId: tool.id,
      from: range?.fromISO ?? '',
      until: range?.untilISO ?? '',
    },
    {
      enabled: !!tool.id && !!range && view !== null,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    },
  );

  const calendarReservations = useMemo(
    () => (reservationsQuery.data ?? []).map(reservationToCalendarEvent),
    [reservationsQuery.data],
  );

  // ---------- UI handlers ----------
  const handleSelectSlot = useCallback((info: DateSelectArg) => {
    setSelectedSlot({ start: info.start, end: info.end });
    calendarRef.current?.getApi().unselect();
  }, []);

  const handleDatesSet = useCallback(
    (info: DatesSetArg) => {
      if (
        view?.snapToToday &&
        (info.view.type === 'timeGridDay' ||
          info.view.type === 'timeGridThreeDay')
      ) {
        setView((view) => (view ? { ...view, snapToToday: false } : view));
        calendarRef.current?.getApi().gotoDate(new Date());
      }

      if (view && info.view.type !== view.name) return;

      const startISO = info.view.activeStart.toISOString();
      const endISO = info.view.activeEnd.toISOString();

      debouncedSetRange({ fromISO: startISO, untilISO: endISO });
    },
    [view, debouncedSetRange],
  );

  const renderEventContent = useCallback(
    (eventInfo: EventContentArg) =>
      eventInfo.event.extendedProps.userId === memberId && !eventInfo.isPast ? (
        <CalendarDialog
          isMember={!!isMember}
          mode='edit'
          toolId={eventInfo.event.extendedProps.toolId}
          reservationId={eventInfo.event.extendedProps.reservationId}
          userId={memberId}
          range={{
            start: eventInfo.event.start,
            end: eventInfo.event.end,
          }}
          notes={eventInfo.event.extendedProps.notes ?? ''}
          windowRange={{
            from: eventInfo.view.activeStart.toISOString(),
            until: eventInfo.view.activeEnd.toISOString(),
          }}
        >
          <CustomEventContent
            eventInfo={eventInfo}
            memberId={memberId}
            isPast={eventInfo.isPast}
          />
        </CalendarDialog>
      ) : (
        <CustomEventContent
          eventInfo={eventInfo}
          memberId={memberId}
          isPast={eventInfo.isPast}
        />
      ),
    [memberId, isMember],
  );

  const calendarConfig = useMemo(() => {
    if (!view) return null;
    return createCalendarConfig({
      calendarRef,
      isLoggedIn,
      isMember: !!isMember,
      memberId,
      isLaptop,
      isIpad,
      view,
      onViewChange: (view) => {
        setView({
          name: view,
          snapToToday: view === 'timeGridDay' || view === 'timeGridThreeDay',
          manual: true,
        });
      },
      handleDatesSet,
      handleSelectSlot,
      t: { week: t('toolbar.week') },
    });
  }, [
    view,
    isMember,
    isLoggedIn,
    memberId,
    isLaptop,
    isIpad,
    handleDatesSet,
    handleSelectSlot,
    t,
  ]);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center overscroll-none'>
      <div className='relative flex w-full justify-center'>
        <Button
          variant={isLoggedIn ? 'default' : 'secondary'}
          className='mb-3'
          onClick={() => {
            setSelectedSlot({ start: new Date(), end: new Date() });
          }}
          disabled={!isLoggedIn}
        >
          <PlusIcon className='mr-2 size-5' />
          {isLoggedIn
            ? t('calendar.createButton')
            : t('calendar.createButtonLoggedOut')}
        </Button>
        {user?.groups.some((g) =>
          ['labops', 'leadership', 'admin'].includes(g),
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

      {selectedSlot && range && (
        <CalendarDialog
          isMember={!!isMember}
          open
          onOpenChange={(open) => !open && setSelectedSlot(null)}
          mode='create'
          toolId={tool.id}
          userId={memberId}
          range={{
            start: selectedSlot.start,
            end: selectedSlot.end,
          }}
          windowRange={{
            from: range.fromISO,
            until: range.untilISO,
          }}
        />
      )}

      <InformationCard />
      {view && calendarConfig ? (
        <div className='w-full overflow-hidden rounded-lg rounded-t-none border border-border bg-background text-foreground'>
          <CustomToolbar
            calendarRef={calendarRef}
            view={view.name}
            onViewChange={(v) => {
              setView((prev) =>
                prev ? { ...prev, name: v, manual: true } : prev,
              );
            }}
            isLaptop={isLaptop}
            isIpad={isIpad}
          />
          <FullCalendar
            key={`${view.name}-${memberId}`}
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            events={calendarReservations}
            locale={t('calendar.locale')}
            eventContent={renderEventContent}
            {...calendarConfig}
          />
        </div>
      ) : (
        <ToolCalendarSkeleton />
      )}
    </div>
  );
}

export { ToolCalendar };
