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
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { keepPreviousData } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  const isMember = user?.groups ? user.groups.length > 0 : false;
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

  // local dialog state
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const [selectedReservation, setSelectedReservation] = useState<{
    reservationId: number;
    toolId: number;
    reservedFrom: Date;
    reservedUntil: Date;
    notes?: string | null;
  } | null>(null);

  const [detailsDialogOpen, setDetailscDialogOpen] = useState(false);
  const [detailsDialogEventId, setDetailsDialogEventId] = useState<
    string | null
  >(null);

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

  const handleEventClick = useCallback(
    (info: EventClickArg) => {
      const isCurrentUsers = info.event.extendedProps.userId === memberId;
      if (isCurrentUsers) {
        setSelectedReservation({
          reservationId: Number(info.event.extendedProps.reservationId),
          toolId: Number(info.event.extendedProps.toolId),
          reservedFrom: info.event.start ?? new Date(),
          reservedUntil: info.event.end ?? new Date(),
          notes: info.event.extendedProps.notes ?? null,
        });
      } else {
        setDetailsDialogEventId(info.event.id);
        setDetailscDialogOpen(true);
      }
    },
    [memberId],
  );

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
    (eventInfo: EventContentArg) => (
      <CustomEventContent
        eventInfo={eventInfo}
        memberId={memberId}
        // below is needed so fullcalendar doesn't open user dialog for non-user reservations
        open={detailsDialogOpen && detailsDialogEventId === eventInfo.event.id}
        onOpenChange={(open) => {
          setDetailscDialogOpen(open);
          if (!open) setDetailsDialogEventId(null);
        }}
      />
    ),
    [memberId, detailsDialogEventId, detailsDialogOpen],
  );
  const calendarConfig = useMemo(() => {
    if (!view) return null;
    return createCalendarConfig({
      calendarRef,
      isMember,
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
      handleEventClick,
      t: { week: t('toolbar.week') },
    });
  }, [
    view,
    isMember,
    memberId,
    isLaptop,
    isIpad,
    handleDatesSet,
    handleSelectSlot,
    handleEventClick,
    t,
  ]);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center overscroll-none'>
      <Button
        variant={isMember ? 'default' : 'secondary'}
        className='mb-3 w-fit self-center'
        onClick={() => {
          setSelectedSlot({ start: new Date(), end: new Date() });
        }}
        disabled={!isMember}
      >
        <PlusIcon className='mr-2 size-5' />
        {isMember
          ? t('calendar.createButton')
          : t('calendar.createButtonLoggedOut')}
      </Button>

      {selectedSlot && range && (
        <CalendarDialog
          open
          onOpenChange={(open) => !open && setSelectedSlot(null)}
          mode='create'
          toolId={tool.id}
          userId={memberId}
          start={selectedSlot.start}
          end={selectedSlot.end}
          windowFromISO={range.fromISO}
          windowUntilISO={range.untilISO}
          onCancel={() => setSelectedSlot(null)}
        />
      )}

      {selectedReservation && range && (
        <CalendarDialog
          open
          onOpenChange={(open) => !open && setSelectedReservation(null)}
          mode='edit'
          toolId={selectedReservation.toolId}
          reservationId={selectedReservation.reservationId}
          userId={memberId}
          start={selectedReservation.reservedFrom}
          end={selectedReservation.reservedUntil}
          notes={selectedReservation.notes ?? ''}
          windowFromISO={range.fromISO}
          windowUntilISO={range.untilISO}
          onCancel={() => setSelectedReservation(null)}
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
