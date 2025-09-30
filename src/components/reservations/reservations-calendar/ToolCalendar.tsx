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
import { Plus } from 'lucide-react';
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

  const isLaptopRaw = useMediaQuery('(min-width: 64.1rem)');
  const isIpadRaw = useMediaQuery('(min-width: 41.438rem)');
  const isLaptop = mounted ? isLaptopRaw : false;
  const isIpad = mounted ? isIpadRaw : false;

  const [manualView, setManualView] = useState(false);
  const [view, setView] = useState<string | null>(null);
  const [range, setRange] = useState<Range | null>(null);
  const [calendarTitle, setCalendarTitle] = useState<string>('');
  const calendarRef = useRef<FullCalendar>(null);
  const pendingTargetViewRef = useRef<string | null>(null);
  const ignoreNextDatesSetRef = useRef(false);

  const debouncedSetRange = useDebounceCallback(
    (next: Range) => setRange(next),
    300,
    { leading: false, trailing: true },
  );

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
      ignoreNextDatesSetRef.current = true;
      pendingTargetViewRef.current = next;
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
      if (ignoreNextDatesSetRef.current) {
        ignoreNextDatesSetRef.current = false;
        return;
      }
      if (
        pendingTargetViewRef.current &&
        info.view.type !== pendingTargetViewRef.current
      )
        return;
      if (
        pendingTargetViewRef.current &&
        info.view.type === pendingTargetViewRef.current
      )
        pendingTargetViewRef.current = null;

      if (view && info.view.type !== view) return;

      setCalendarTitle(info.view.title);

      const startISO = info.view.activeStart.toISOString();
      const endISO = info.view.activeEnd.toISOString();

      setRange((prev) => {
        if (prev && prev.fromISO === startISO && prev.untilISO === endISO)
          return prev;
        debouncedSetRange({ fromISO: startISO, untilISO: endISO });
        return prev;
      });
    },
    [view, debouncedSetRange],
  );

  const renderEventContent = useCallback(
    (eventInfo: EventContentArg) => (
      <CustomEventContent eventInfo={eventInfo} />
    ),
    [],
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
      onViewChange: (v) => {
        setManualView(true);
        pendingTargetViewRef.current = v;
        setView(v);
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
        className='mb-1 w-fit self-center'
        onClick={() => {
          setCreateOption('createButton');
          setSelectedSlot({ start: new Date(), end: new Date() });
        }}
        disabled={!isMember}
      >
        <Plus className='mr-2 size-5' />
        {t('calendar.createButton')}
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
          range={{ fromISO: range.fromISO, untilISO: range.untilISO }}
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
          range={{ fromISO: range.fromISO, untilISO: range.untilISO }}
          onCancel={() => setSelectedReservation(null)}
        />
      )}

      <InformationCard />
      {mounted && view && calendarConfig ? (
        <div className='w-full overflow-hidden rounded-lg rounded-t-none border border-border bg-background text-foreground'>
          <CustomToolbar
            title={calendarTitle}
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
