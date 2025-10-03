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
import { useMounted } from '@/lib/hooks/useMounted';
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
  const mounted = useMounted();
  const t = useTranslations('reservations');

  const isLoggedIn = !!user;
  const isMember = isLoggedIn && user.groups.length > 0;
  const memberId = isMember ? user.id : 0;

  const isLaptopRaw = useMediaQuery('(min-width: 70rem)');
  const isIpadRaw = useMediaQuery('(min-width: 41.438rem)');
  const isLaptop = mounted ? isLaptopRaw : false;
  const isIpad = mounted ? isIpadRaw : false;

  const [manualView, setManualView] = useState(false);
  const [view, setView] = useState<string | null>(null);
  const [range, setRange] = useState<Range | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const pendingTargetViewRef = useRef<string | null>(null);
  const snapToTodayOnEntryRef = useRef(false);

  // Used in dateset to prevent redundant fetches if use spam clicks next/prev buttons
  const latestWindowRef = useRef<{ startISO: string; endISO: string } | null>(
    null,
  );
  const navSettleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Decide initial/auto view
  useEffect(() => {
    if (!mounted || manualView) return;

    const next = isLaptop
      ? 'timeGridWeek'
      : isIpad
        ? 'timeGridThreeDay'
        : 'timeGridDay';
    setView((prev) => {
      if (prev === next) return prev;
      snapToTodayOnEntryRef.current =
        next === 'timeGridDay' || next === 'timeGridThreeDay';

      return next;
    });
  }, [mounted, isLaptop, isIpad, manualView]);

  // ---------- Data fetching ----------
  const reservationsQuery = api.reservations.fetchCalendarReservations.useQuery(
    {
      toolId: tool.id,
      from: range?.fromISO ?? '',
      until: range?.untilISO ?? '',
    },
    {
      enabled:
        mounted &&
        !!tool.id &&
        !!range &&
        view !== null &&
        !pendingTargetViewRef.current,
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
    setCreateOption('calendarSelect');
    setSelectedSlot({ start: info.start, end: info.end });
    calendarRef.current?.getApi().unselect();
  }, []);

  const handleEventClick = useCallback(
    (info: EventClickArg) => {
      const isCurrentUsers = info.event.extendedProps.userId === memberId;
      if (!isCurrentUsers) return;
      setSelectedReservation({
        reservationId: Number(info.event.extendedProps.reservationId),
        toolId: Number(info.event.extendedProps.toolId),
        reservedFrom: info.event.start ?? new Date(),
        reservedUntil: info.event.end ?? new Date(),
        notes: info.event.extendedProps.notes ?? null,
      });
    },
    [memberId],
  );

  const handleDatesSet = useCallback(
    (info: DatesSetArg) => {
      if (
        snapToTodayOnEntryRef.current &&
        (info.view.type === 'timeGridDay' ||
          info.view.type === 'timeGridThreeDay')
      ) {
        snapToTodayOnEntryRef.current = false;
        calendarRef.current?.getApi().gotoDate(new Date());
      }

      if (
        pendingTargetViewRef.current &&
        info.view.type !== pendingTargetViewRef.current
      ) {
        return;
      }
      if (
        pendingTargetViewRef.current &&
        info.view.type === pendingTargetViewRef.current
      ) {
        pendingTargetViewRef.current = null;
      }

      if (view && info.view.type !== view) return;

      const startISO = info.view.activeStart.toISOString();
      const endISO = info.view.activeEnd.toISOString();

      // our useDebounceCallback hook didn't prevent next/prev button spamclick, i.e. if user spamclicked next 10 times, we fetched for 10 weeks.
      // Decided to do whats below
      latestWindowRef.current = { startISO, endISO };
      if (navSettleTimerRef.current) clearTimeout(navSettleTimerRef.current);

      navSettleTimerRef.current = setTimeout(() => {
        const latest = latestWindowRef.current;
        if (!latest) return;

        setRange((prev) => {
          if (prev) {
            if (
              prev.fromISO === latest.startISO &&
              prev.untilISO === latest.endISO
            ) {
              return prev;
            }
          }
          return { fromISO: latest.startISO, untilISO: latest.endISO };
        });
      }, 600);
    },
    [view],
  );

  const renderEventContent = useCallback(
    (eventInfo: EventContentArg) => (
      <CustomEventContent eventInfo={eventInfo} memberId={memberId} />
    ),
    [memberId],
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
      manualView,
      onViewChange: (view) => {
        setManualView(true);
        pendingTargetViewRef.current = view;
        snapToTodayOnEntryRef.current =
          view === 'timeGridDay' || view === 'timeGridThreeDay';
        setView(view);
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
    manualView,
    handleDatesSet,
    handleSelectSlot,
    handleEventClick,
    t,
  ]);

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

  const [createOption, setCreateOption] = useState<
    'calendarSelect' | 'createButton' | null
  >(null);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center overscroll-none'>
      <Button
        variant='default'
        className='mb-3 w-fit self-center'
        onClick={() => {
          setCreateOption('createButton');
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
          reservationId={undefined}
          userId={memberId}
          start={selectedSlot.start}
          end={selectedSlot.end}
          windowFromISO={range.fromISO}
          windowUntilISO={range.untilISO}
          onCancel={() => setSelectedSlot(null)}
          pristine={createOption === 'calendarSelect'}
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
      {mounted && view && calendarConfig ? (
        <div className='w-full overflow-hidden rounded-lg rounded-t-none border border-border bg-background text-foreground'>
          <CustomToolbar
            calendarRef={calendarRef}
            view={view}
            onViewChange={(v) => {
              setManualView(true);
              pendingTargetViewRef.current = v;
              setView(v);
            }}
            isLaptop={isLaptop}
            isIpad={isIpad}
          />
          <FullCalendar
            key={`${view}-${memberId}`}
            ref={calendarRef}
            plugins={[timeGridPlugin, interactionPlugin]}
            events={calendarReservations}
            {...calendarConfig}
            locale={t('calendar.locale')}
            eventContent={renderEventContent}
          />
        </div>
      ) : (
        <ToolCalendarSkeleton />
      )}
    </div>
  );
}

export { ToolCalendar };
