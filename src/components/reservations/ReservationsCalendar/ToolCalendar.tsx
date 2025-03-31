'use client';

import CustomEventStyling from '@/components/reservations/ReservationsCalendar/CustomEventStyling';
import CustomToolbar from '@/components/reservations/ReservationsCalendar/CustomToolbar';
import { Button } from '@/components/ui/Button';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import type {
  DateSelectArg,
  DatesSetArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  FormatDateOptions,
} from '@fullcalendar/core';
import interactionPlugin, {
  type EventResizeDoneArg,
} from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '@/lib/styles/calendar.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { cx } from '@/lib/utils';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import CalendarDialog from './CalendarDialog';
import InformationCard from './InformationCard';

const viewTypes = {
  timeGridDay: {
    type: 'timeGrid',
    duration: { days: 1 },
  },
  timeGridThreeDay: {
    type: 'timeGrid',
    duration: { days: 3 },
  },
  timeGridWeek: {
    type: 'timeGrid',
    duration: { days: 7 },
  },
};

const timeFormats: {
  eventTimeFormat: FormatDateOptions;
  slotLabelFormat: FormatDateOptions;
  titleFormat: FormatDateOptions;
  dayHeaderFormat: FormatDateOptions;
} = {
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
  titleFormat: {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  },
  dayHeaderFormat: {
    weekday: 'short',
    month: '2-digit',
    day: '2-digit',
  },
};

/** Midlertidig type, legger til mer når jeg begynner på backend */
type Reservation = {
  toolType: string;
  toolName: string;
  toolSlug: string;
  userId: string;
  reservationId: string;
  start: Date | string;
  end: Date | string;
  navn: string;
  mobilNr: string;
  email: string;
};

/**
 * For den uheldige sjel som må endre på noe her i fremtiden:
 * Fullcalendar har en del props og options, men heldigvis er det god dokumentasjon, eksempler og forklaring
 * på hooks, props, types osv, på nettsiden deres og ellers i github repoet:
 * https://fullcalendar.io/docs
 * https://github.com/fullcalendar/fullcalendar-examples/tree/main/react18
 * https://stackblitz.com/github/fullcalendar/fullcalendar-examples/tree/main/react18?file=src%2FDemoApp.jsx
 * ^ Demo prosjekt laget av fullcalendar selv.
 * @returns ToolCalendar
 */

export default function ToolCalendar() {
  const t = useTranslations('reservations');
  const [storedReservations, setStoredReservations] = useLocalStorage<
    Reservation[]
  >('reservations', []);
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const calendarEvents = reservations.map((reserv) => ({
    // id: reserv.reservationId, full calendar generer også egne  unike id for hver event som er laget på kalenderen
    start: reserv.start,
    end: reserv.end,
    extendedProps: {
      reservationId: reserv.reservationId,
      toolType: reserv.toolType,
      toolName: reserv.toolName,
      toolSlug: reserv.toolSlug,
      userId: reserv.userId, //skal ikke sende userId når jeg begynner med backend, sender det nå for å teste click, delete etc. funksjoner
      navn: reserv.navn,
      mobilNr: reserv.mobilNr,
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

  /**Midlertidig constandterf */
  const userId = '9b891ea8-22f5-48ff-88c3-f0d88f27450d'; // miderltidig for å sjekke conditions på egne vs andres reservasjoner
  const isMember = true;
  const isLoggedIn = true;
  const toolType = 'printer';
  const toolName = 'Prusa i3 MK3';
  const toolSlug = 'prusamk3';

  function customEventStyling(eventInfo: EventContentArg) {
    return (
      <CustomEventStyling
        calendarRef={calendarRef}
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
      | 'toolSlug'
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
      | 'toolSlug'
      | 'reservationId'
      | 'userId'
    >,
  ) {
    const newEvent = {
      toolType: toolType,
      toolName: toolName,
      toolSlug: toolSlug,
      reservationId: crypto.randomUUID(),
      userId: crypto.randomUUID(),
      navn: data.navn,
      mobilNr: data.mobilNr,
      email: data.email,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    const updated = [...(storedReservations || []), newEvent];
    setStoredReservations(updated);
    setReservations([...reservations, newEvent]);
    setSelectedSlot(null);
  }

  function handleEventDrop(info: EventDropArg) {
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
  }

  function handleEventResize(info: EventResizeDoneArg) {
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
  }

  useEffect(() => {
    if (calendarRef.current) {
      /**
       * Bruker queueMicroTask for å unngå flushSync error, løsning hentet fra:
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
        .scrollToTime(format(date, 'hh:mm:ss', { locale: nb }));
    }
  }

  return (
    <div className='container my-auto overscroll-none'>
      <InformationCard
        onClick={() => setSelectedSlot({ start: new Date(), end: new Date() })}
      />
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
          navn: selectedReservation?.navn ?? '',
          email: selectedReservation?.email ?? '',
          mobilNr: selectedReservation?.mobilNr ?? '',
        }}
      />
      <div className='overflow-hidden rounded-lg rounded-t-none border border-border bg-background text-foreground'>
        <CustomToolbar
          view={view}
          date={date}
          onViewChange={setView}
          calendarRef={calendarRef}
        />
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          slotMinTime={isMember ? '00:00:00' : '10:00:00'}
          slotMaxTime={isMember ? '23:59:59' : '18:00:00'}
          initialView={view}
          headerToolbar={false}
          views={viewTypes}
          datesSet={handleDatesSet}
          height={650}
          selectable={true}
          selectMirror={true}
          eventOverlap={false}
          selectOverlap={false}
          weekends={isMember}
          events={calendarEvents}
          select={handleSelectSlot}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventDataTransform={(eventInfo) => ({
            ...eventInfo,
            editable: eventInfo.extendedProps?.userId === userId,
          })}
          droppable={true}
          allDaySlot={false}
          nowIndicator={true}
          snapDuration='00:15:00'
          slotDuration='00:30:00'
          slotLabelInterval='01:00'
          selectAllow={(info) => {
            return Date.now() - info.start.getTime() <= 0 && isLoggedIn;
          }}
          selectLongPressDelay={200}
          {...timeFormats}
          firstDay={1}
          locale={t('calendar.locale')}
          eventResizableFromStart
          eventContent={customEventStyling}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
}
