import type {
  DateSelectArg,
  DateSpanApi,
  DatesSetArg,
  DayCellMountArg,
  EventClickArg,
  EventDropArg,
  EventInput,
  EventMountArg,
  FormatDateOptions,
  NowIndicatorMountArg,
  ViewMountArg,
  WeekNumberContentArg,
} from '@fullcalendar/core';
import type { EventResizeDoneArg } from '@fullcalendar/interaction/index.js';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useTranslations } from 'next-intl';

/**
 * Måtte lage egen config fil for statiske variabler fordi toolcalendar.tsx ble for lang..
 */
export const viewTypes = {
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

type CalendarConfigArgs = {
  date: Date;
  isLoggedIn: boolean;
  isMember: boolean;
  userId: string;
  view: string;
  handleDatesSet: (arg: DatesSetArg) => void;
  handleSelectSlot: (arg: DateSelectArg) => void;
  handleEventClick: (arg: EventClickArg) => void;
  handleEventDrop: (arg: EventDropArg) => void;
  handleEventResize: (arg: EventResizeDoneArg) => void;
  t: {
    week: string;
  };
};

export function createCalendarConfig({
  date,
  isLoggedIn,
  isMember,
  userId,
  view,
  handleDatesSet,
  handleSelectSlot,
  handleEventClick,
  handleEventDrop,
  handleEventResize,
  t,
}: CalendarConfigArgs) {
  return {
    ...timeFormats,
    select: handleSelectSlot,
    views: viewTypes,
    viewClassNames: 'text-base w-full border-border',
    eventClassNames: 'break-words text-center bg-secondary',
    eventBorderColor: 'transparent',
    eventBackgroundColor: 'inherit',
    eventResizableFromStart: true,
    weekNumbers: true,
    weekNumberFormat: () => format(date, 'w'),
    weekNumberContent: (info: WeekNumberContentArg) => `${t.week} ${info.num}`,
    slotMinTime: isMember ? '00:00:00' : '10:00:00',
    slotMaxTime: isMember ? '23:59:59' : '18:00:00',
    weekends: isMember,
    initialView: view,
    headerToolbar: false as false,
    datesSet: handleDatesSet,
    height: 650,
    selectable: true,
    selectMirror: true,
    selectAllow: (info: DateSpanApi) =>
      Date.now() - info.start.getTime() <= 0 && isLoggedIn,
    selectOverlap: false,
    eventOverlap: false,
    eventClick: handleEventClick,
    eventDrop: handleEventDrop,
    eventResize: handleEventResize,
    eventDataTransform: (eventInfo: EventInput) => ({
      ...eventInfo,
      editable: eventInfo.extendedProps?.userId === userId,
    }),
    droppable: true,
    allDaySlot: false,
    nowIndicator: true,
    snapDuration: '00:15:00',
    slotDuration: '00:30:00',
    slotLabelInterval: '01:00',
    selectLongPressDelay: 200,
    firstDay: 1,
    eventDidMount: (info: EventMountArg) => {
      const isOwn = info.event.extendedProps.userId === userId;
      info.el.style.backgroundColor =
        isOwn && isLoggedIn ? 'var(--primary)' : 'oklch(27.8% 0.033 256.848)';
      info.el.style.borderColor = 'var(--border)';
      info.el.style.color =
        isOwn && isLoggedIn ? 'var(--primary-foreground)' : '';
      info.el.style.borderRadius = '0.4rem';
    },
    dayCellDidMount: (info: DayCellMountArg) => {
      if (info.isToday) {
        info.el.style.backgroundColor = 'oklch(from var(--accent) l c h / 0.5)';
      } else if (info.isPast) {
        info.el.style.backgroundColor = 'var(--destructive)';
        info.el.style.opacity = '0.1';
      }
    },
  };
}
