'use client';

import { createCalendarConfig } from '@/components/reservations/reservations-calendar/CalendarConfig';
import { CalendarConfirmDialog } from '@/components/reservations/reservations-calendar/CalendarConfirmDialog';
import { CalendarDialog } from '@/components/reservations/reservations-calendar/CalendarDialog';
import { CustomEventContent } from '@/components/reservations/reservations-calendar/CustomEventContent';
import CustomToolbar from '@/components/reservations/reservations-calendar/CustomToolbar';
import { InformationCard } from '@/components/reservations/reservations-calendar/InformationCard';
import { Button } from '@/components/ui/Button';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import '@/lib/styles/calendar.css';
import type {
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from '@fullcalendar/core';
import interactionPlugin, {
  type EventResizeDoneArg,
} from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Plus } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

/** Temporary type for testing functionality till backend */
type Reservation = {
  toolType: string;
  toolName: string;
  toolId: string;
  userId: string;
  reservationId: string;
  start: Date | string;
  end: Date | string;
  name: string;
  phoneNr: string;
  email: string;
};

/**
 * For anyone having to edit or work on the code for the calendar:
 * Fullcalendar has quite a few props and options to work with,
 * but fortunately there is good documentation, examples, and explanations of hooks, props, types, etc., on their website and also in the GitHub repo:
 * https://fullcalendar.io/docs
 * https://github.com/fullcalendar/fullcalendar-examples/tree/main/react18
 * https://github.com/orgs/fullcalendar/repositories?type=all
 * https://github.com/fullcalendar/fullcalendar-react
 * https://stackblitz.com/github/fullcalendar/fullcalendar-examples/tree/main/react18?file=src%2FDemoApp.jsx
 * ^ Demo project made by fullcalendar themselves.
 * @returns ToolCalendar
 */

export default function ToolCalendar() {
  const format = useFormatter();
  const t = useTranslations('reservations');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);
  const [cancelAction, setCancelAction] = useState<(() => void) | null>(null);
  const [storedReservations, setStoredReservations] = useLocalStorage<
    Reservation[]
  >('reservations', []);
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const calendarEvents = reservations.map((reserv) => ({
    // id: reserv.reservationId, full calendar also generates unique userID
    start: reserv.start,
    end: reserv.end,
    extendedProps: {
      reservationId: reserv.reservationId,
      toolType: reserv.toolType,
      toolName: reserv.toolName,
      toolId: reserv.toolId, // These are temporary just to ensure that correct reservations end up on the correct calendar, will probably be changed when backend begins
      userId: reserv.userId, // This is again for testing, userID will not be sent when backend starts
      name: reserv.name,
      phoneNr: reserv.phoneNr,
      email: reserv.email,
    },
  }));
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [view, setView] = useState<string>('timeGridDay');
  const isLaptop = useMediaQuery('(min-width: 64.1rem)');
  const isIPad = useMediaQuery('(min-width: 41.438rem)');
  const calendarRef = useRef<FullCalendar>(null);

  /**Midlertidig constandterf, endre disse verdiene for å teste ulike handlers, tabellen på main page osv.*/
  const userId = '233d9770-817c-4d57-a9ec-1795683ddb54'; // miderltidig for å sjekke conditions på egne vs andres reservasjoner
  const isMember = true;
  const isLoggedIn = true;
  const toolType = 'printer';
  const toolName = 'Prusa i3 MK3';
  const toolId = 'prusamk3';

  function customEventStyling(eventInfo: EventContentArg) {
    return (
      <CustomEventContent
        eventInfo={eventInfo}
        userId={userId ?? ''}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  useEffect(() => {
    if (isLaptop) {
      setView('timeGridWeek');
    } else if (isIPad) {
      setView('timeGridThreeDay');
    } else {
      setView('timeGridDay');
    }
  }, [isIPad, isLaptop]);

  useEffect(() => {
    if (storedReservations) {
      setReservations(storedReservations);
    }
  }, [storedReservations]);

  function handleSelectSlot(selected: DateSelectArg) {
    setSelectedSlot({
      start: selected.start,
      end: selected.end,
    });
  }

  function handleEventClick(clicked: EventClickArg) {
    const event = clicked.event;
    const isCurrentUsers = event.extendedProps.userId === userId;
    if (isCurrentUsers) {
      const exists = reservations.find(
        (res) => res.reservationId === event.extendedProps.reservationId,
      );
      if (exists) {
        setSelectedReservation(exists);
      }
    }
  }

  function handleUpdateEvent(
    data: Omit<
      Reservation,
      | 'reservationId'
      | 'toolType'
      | 'toolName'
      | 'toolId'
      | 'reservationId'
      | 'userId'
    >,
  ) {
    if (!selectedReservation) return;
    const updated = reservations.map((res) =>
      res.reservationId === selectedReservation.reservationId
        ? { ...res, ...data }
        : res,
    );
    setReservations(updated);
    setStoredReservations(updated);
    setSelectedReservation(null);
  }

  function handleDeleteEvent(reservationId: string) {
    const updated = reservations.filter(
      (r) => r.reservationId !== reservationId,
    );
    setReservations(updated);
    setStoredReservations(updated);
    setSelectedReservation(null);
  }

  function handleCreateEvent(
    data: Omit<
      Reservation,
      | 'reservationId'
      | 'toolType'
      | 'toolName'
      | 'toolId'
      | 'reservationId'
      | 'userId'
    >,
  ) {
    const newEvent = {
      toolType: toolType,
      toolName: toolName,
      toolId: toolId,
      reservationId: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      name: data.name,
      phoneNr: data.phoneNr,
      email: data.email,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    const updated = [...(storedReservations || []), newEvent];
    setStoredReservations(updated);
    setReservations([...reservations, newEvent]);
    setSelectedSlot(null);
  }

  function action(action: () => void, cancel?: () => void) {
    setConfirmAction(() => action);
    setCancelAction(() => cancel ?? (() => {}));
    setConfirmOpen(true);
  }

  function handleEventResize(info: EventResizeDoneArg) {
    action(
      () => {
        if (info.event.start && info.event.start < new Date()) {
          info.revert();
          return;
        }
        const { event } = info;
        const updated = reservations.map((res) =>
          res.userId === event.extendedProps?.userId
            ? {
                ...res,
                start: event.start ?? res.start,
                end: event.end ?? res.end,
              }
            : res,
        );
        setReservations(updated);
        setStoredReservations(updated);
      },
      () => info.revert(),
    );
  }

  function handleEventDrop(info: EventDropArg) {
    action(
      () => {
        if (info.event.start && info.event.start < new Date()) {
          info.revert();
          return;
        }

        const { event } = info;
        const updated = reservations.map((res) =>
          res.userId === event.extendedProps?.userId
            ? {
                ...res,
                start: event.start ?? res.start,
                end: event.end ?? res.end,
              }
            : res,
        );
        setReservations(updated);
        setStoredReservations(updated);
      },
      () => info.revert(),
    );
  }

  useEffect(() => {
    if (calendarRef.current) {
      /**
       * Bruker queueMicroTask for å unngå flushSync error:
       * https://github.com/facebook/lexical/discussions/3536#discussioncomment-7441047 */
      queueMicrotask(() => {
        calendarRef.current?.getApi().changeView(view);
      });
    }
  }, [view]);

  function handleDatesSet(dateSet: DatesSetArg) {
    setDate(dateSet.start);
    if (calendarRef.current) {
      calendarRef.current
        ?.getApi()
        .scrollToTime(
          format.dateTime(Date.now(), { hour: 'numeric', minute: 'numeric' }),
        );
    }
  }

  const calendarConfig = createCalendarConfig({
    isLoggedIn,
    isMember,
    userId,
    view,
    handleDatesSet,
    handleSelectSlot,
    handleEventClick,
    handleEventDrop,
    handleEventResize,
    t: { week: t('toolbar.week') },
  });

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center overscroll-none'>
      <Button
        variant='default'
        className='mb-1 w-fit self-center'
        onClick={() => setSelectedSlot({ start: new Date(), end: new Date() })}
      >
        <Plus className='mr-2 size-5' />
        {t('calendar.createButton')}
      </Button>
      <CalendarDialog
        open={selectedSlot !== null}
        onOpenChange={() => setSelectedSlot(null)}
        start={selectedSlot?.start ?? new Date()}
        end={selectedSlot?.end ?? new Date()}
        mode='create'
        onSubmit={handleCreateEvent}
        onCancel={() => setSelectedSlot(null)}
      />
      <CalendarDialog
        open={selectedReservation !== null}
        onOpenChange={() => setSelectedReservation(null)}
        start={new Date(selectedReservation?.start ?? new Date())}
        end={new Date(selectedReservation?.end ?? new Date())}
        mode='view'
        onSubmit={handleUpdateEvent}
        onCancel={() => setSelectedReservation(null)}
        onDelete={() =>
          selectedReservation &&
          handleDeleteEvent(selectedReservation.reservationId)
        }
        defaultValues={{
          name: selectedReservation?.name ?? '',
          email: selectedReservation?.email ?? '',
          phoneNr: selectedReservation?.phoneNr ?? '',
        }}
      />
      <div className='w-full overflow-hidden rounded-lg rounded-b-none border border-border bg-background text-foreground'>
        <CustomToolbar
          view={view}
          date={date}
          onViewChange={setView}
          calendarRef={calendarRef}
        />
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          events={calendarEvents}
          {...calendarConfig}
          locale={t('calendar.locale')}
          eventContent={customEventStyling}
        />
      </div>
      <InformationCard />
      <CalendarConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => {
          confirmAction?.();
          setConfirmAction(null);
          setCancelAction(null);
        }}
        onCancel={() => {
          cancelAction?.();
          setConfirmAction(null);
          setCancelAction(null);
        }}
        t={{
          title: t('confirmDialog.title'),
          description: t('confirmDialog.description', {
            action: 'endre tidspunkt for reservasjonen?',
          }),
          confirm: t('confirmDialog.confirm'),
          cancel: t('confirmDialog.cancel'),
        }}
      />
    </div>
  );
}
