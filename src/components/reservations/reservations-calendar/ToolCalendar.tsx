'use client';

import { createCalendarConfig } from '@/components/reservations/reservations-calendar/CalendarConfig';
import { CalendarConfirmDialog } from '@/components/reservations/reservations-calendar/CalendarConfirmDialog';
import type { CalendarDialogProps } from '@/components/reservations/reservations-calendar/CalendarDialog';
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
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import type { RouterOutput, RouterOutputs } from '@/server/api';

type ToolCalendarProps = {
  tool: NonNullable<RouterOutput['tools']['fetchTool']>;
  user: RouterOutputs['auth']['state']['user'];
};

type CalendarReservation =
  RouterOutput['reservations']['fetchCalendarReservations'][number];

type Range = { fromISO: string; untilISO: string };

// Solution to fix hydration error as suggested by nextjs: https://nextjs.org/docs/messages/react-hydration-error?utm_source=chatgpt.com#solution-2-disabling-ssr-on-specific-components
const CalendarDialog = dynamic<CalendarDialogProps>(
  () =>
    import('@/components/reservations/reservations-calendar/CalendarDialog'),
  { ssr: false },
);

function ToolCalendar({ tool, user }: ToolCalendarProps) {
  const mounted = useMounted();
  const t = useTranslations('reservations');

  const isLoggedIn = !!user;
  const isMember = isLoggedIn && user.groups.length > 0;
  const memberId = isMember ? user.id : 0;
  const isLaptopRaw = useMediaQuery('(min-width: 64.1rem)');
  const isIpadRaw = useMediaQuery('(min-width: 41.438rem)');
  const isLaptop = mounted ? isLaptopRaw : false; // stable SSR fallback
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
    200,
    { leading: false, trailing: true },
  );

  // Decide initial/auto view
  useEffect(() => {
    if (!mounted) return;
    if (manualView) return;

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

  const utils = api.useUtils();

  function currentRangeInput() {
    if (!range) return null;
    return { toolId: tool.id, from: range.fromISO, until: range.untilISO };
  }

  function isFinished(reservedUntil: Date | string) {
    const end =
      reservedUntil instanceof Date ? reservedUntil : new Date(reservedUntil);
    return end.getTime() <= Date.now(); // compare in UTC epoch ms
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

  const calendarReservations = (reservationsQuery.data ?? []).map(
    reservationToCalendarEvent,
  );

  // ---------- Mutations ----------
  const createMutation = api.reservations.createReservation.useMutation({
    onSuccess: async (created) => {
      if (!created) return;

      const createdFull = await utils.reservations.fetchOneReservation.fetch({
        reservationId: created.reservationId,
      });

      const r = createdFull as CalendarReservation;

      const input = currentRangeInput();
      if (input) {
        utils.reservations.fetchCalendarReservations.setData(input, (prev) =>
          prev ? [...prev, r] : [r],
        );
      }

      setSelectedSlot(null);
    },
  });

  const updateMutation = api.reservations.updateReservation.useMutation({
    onSuccess: async (updated) => {
      if (!updated) return;

      const updatedFull = await utils.reservations.fetchOneReservation.fetch({
        reservationId: updated.reservationId,
      });

      const r = updatedFull as CalendarReservation;

      const input = currentRangeInput();
      if (input) {
        utils.reservations.fetchCalendarReservations.setData(input, (prev) => {
          if (!prev) return prev;
          return prev.map((x) => (x.reservationId === r.reservationId ? r : x));
        });
      }

      setSelectedReservation(null);
    },
  });

  const deleteMutation = api.reservations.deleteReservation.useMutation({
    onSuccess: async (_, variables) => {
      const input = currentRangeInput();
      if (input) {
        utils.reservations.fetchCalendarReservations.setData(input, (prev) => {
          if (!prev) return prev;
          return prev.filter(
            (x) => x.reservationId !== variables.reservationId,
          );
        });
      }
      setSelectedReservation(null);
      setPendingDelete(null);
    },
  });

  // ---------- UI handlers ----------
  function customEventStyling(eventInfo: EventContentArg) {
    return (
      <CustomEventContent
        eventInfo={eventInfo}
        userId={memberId}
        isLoggedIn={isMember}
      />
    );
  }

  function handleSelectSlot(info: DateSelectArg) {
    setSelectedSlot({ start: info.start, end: info.end });
    calendarRef.current?.getApi().unselect();
  }

  function handleEventClick(info: EventClickArg) {
    const isCurrentUsers = info.event.extendedProps.userId === memberId;
    if (!isCurrentUsers) return;
    setSelectedReservation({
      reservationId: Number(info.event.extendedProps.reservationId),
      toolId: Number(info.event.extendedProps.toolId),
      reservedFrom: info.event.start ?? new Date(),
      reservedUntil: info.event.end ?? new Date(),
      notes: info.event.extendedProps.notes ?? null,
    });
  }

  function handleDatesSet(info: DatesSetArg) {
    // prevents fetching calendar reservations twice, on initial default view and the view change as a result of useEffect
    if (ignoreNextDatesSetRef.current) {
      ignoreNextDatesSetRef.current = false;
      return;
    }

    // prevents duplicate fetch when transitioning between views
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

    if (range && range.fromISO === startISO && range.untilISO === endISO)
      return;

    debouncedSetRange({ fromISO: startISO, untilISO: endISO });
  }

  // ---------- Create / Update dialog handlers ----------
  function handleCreateEvent(values: {
    reservedFrom: Date;
    reservedUntil: Date;
    notes?: string;
  }) {
    createMutation.mutate({
      toolId: tool.id,
      reservedFrom: values.reservedFrom,
      reservedUntil: values.reservedUntil,
      notes: values.notes ?? '',
    });
  }

  function handleUpdateEvent(values: {
    reservedFrom: Date;
    reservedUntil: Date;
    notes?: string;
  }) {
    if (!selectedReservation) return;
    updateMutation.mutate({
      reservationId: selectedReservation.reservationId,
      toolId: selectedReservation.toolId,
      reservedFrom: values.reservedFrom,
      reservedUntil: values.reservedUntil,
      notes: values.notes ?? '',
    });
  }

  function requestDelete() {
    if (!selectedReservation) return;
    setPendingDelete({
      reservationId: selectedReservation.reservationId,
      toolId: selectedReservation.toolId,
      userId: memberId,
    });
    setConfirmOpen(true);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete);
  }

  // Calendarconfig
  const calendarConfig = view
    ? createCalendarConfig({
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
      })
    : null;

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

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    reservationId: number;
    toolId: number;
    userId: number;
  } | null>(null);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center overscroll-none'>
      <Button
        variant='default'
        className='mb-1 w-fit self-center'
        onClick={() =>
          isMember && setSelectedSlot({ start: new Date(), end: new Date() })
        }
      >
        <Plus className='mr-2 size-5' />
        {t('calendar.createButton')}
      </Button>

      {selectedSlot && (
        <CalendarDialog
          open
          onOpenChange={(open) => !open && setSelectedSlot(null)}
          start={selectedSlot.start}
          end={selectedSlot.end}
          mode='create'
          onSubmit={handleCreateEvent}
          onCancel={() => setSelectedSlot(null)}
        />
      )}

      {selectedReservation && (
        <CalendarDialog
          open
          onOpenChange={(open) => !open && setSelectedReservation(null)}
          start={selectedReservation.reservedFrom}
          end={selectedReservation.reservedUntil}
          mode='edit'
          onSubmit={handleUpdateEvent}
          onCancel={() => setSelectedReservation(null)}
          onDelete={requestDelete}
          defaultValues={{ notes: selectedReservation.notes ?? '' }}
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
            eventContent={customEventStyling}
          />
        </div>
      ) : (
        <ToolCalendarSkeleton />
      )}

      <CalendarConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
          confirmDelete();
          setConfirmOpen(false);
        }}
        onCancel={() => {
          setConfirmOpen(false);
          setPendingDelete(null);
        }}
        t={{
          title: t('confirmDialog.title'),
          description: t('confirmDialog.description'),
          confirm: t('confirmDialog.confirm'),
          cancel: t('confirmDialog.cancel'),
        }}
      />
    </div>
  );
}

export { ToolCalendar };
