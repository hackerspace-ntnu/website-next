import type {
  DateSelectArg,
  DateSpanApi,
  DatesSetArg,
  DayCellMountArg,
  EventClickArg,
  EventInput,
  EventMountArg,
  FormatDateOptions,
  WeekNumberContentArg,
} from '@fullcalendar/core';
import type { RefObject } from '@fullcalendar/core/preact';
import type FullCalendar from '@fullcalendar/react';
export const viewTypes = {
  timeGridDay: { type: 'timeGrid', duration: { days: 1 } },
  timeGridThreeDay: { type: 'timeGrid', duration: { days: 3 } },
  timeGridWeek: { type: 'timeGrid' },
};

const timeFormats: {
  eventTimeFormat: FormatDateOptions;
  slotLabelFormat: FormatDateOptions;
  titleFormat: FormatDateOptions;
  dayHeaderFormat: FormatDateOptions;
} = {
  eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
  titleFormat: { month: 'long', year: 'numeric', day: 'numeric' },
  dayHeaderFormat: { weekday: 'short', month: '2-digit', day: '2-digit' },
};

type CalendarConfigProps = {
  calendarRef: RefObject<FullCalendar | null>;
  isMember: boolean;
  memberId: number;
  isLaptop: boolean;
  isIpad: boolean;
  view: string;
  manualView: boolean;
  onViewChange: (view: string) => void;
  handleDatesSet: (info: DatesSetArg) => void;
  handleSelectSlot: (info: DateSelectArg) => void;
  handleEventClick: (info: EventClickArg) => void;
  t: { week: string };
};

export function createCalendarConfig({
  calendarRef,
  isMember,
  memberId,
  isLaptop,
  isIpad,
  view,
  manualView,
  onViewChange,
  handleDatesSet,
  handleSelectSlot,
  handleEventClick,
  t,
}: CalendarConfigProps) {
  function decideView() {
    if (isLaptop) return 'timeGridWeek';
    if (isIpad) return 'timeGridThreeDay';
    return 'timeGridDay';
  }

  return {
    ...timeFormats,

    rerenderDelay: 0,
    progressiveEventRendering: true,
    scrollTimeReset: false,
    views: viewTypes,
    initialView: view,
    headerToolbar: false as const,
    height: 750,
    scrollTime: '10:00:00',
    allDaySlot: false,
    nowIndicator: true,
    firstDay: 1,
    snapDuration: '00:15:00',
    slotDuration: isMember ? '00:30:00' : '00:15:00',
    slotLabelInterval: isMember ? '01:00:00' : '00:30:00',
    slotMinTime: isMember ? '00:00:00' : '10:00:00',
    slotMaxTime: isMember ? '23:59:59' : '18:00:00',
    weekends: isMember,

    //keep this or else reservations/events wont show when logged out
    businessHours: {
      startTime: '00:00:00',
      endTime: '23:59:59',
      daysOfWeek: 'all',
    },

    // selection
    selectable: true,
    select: handleSelectSlot,
    selectOverlap: false,
    selectMirror: true,
    selectAllow: (info: DateSpanApi) =>
      isMember && info.start.getTime() >= Date.now(),
    longPressDelay: 200,

    // event/reservations
    editable: true,
    eventStartEditable: false,
    eventDurationEditable: false,
    eventOverlap: false,
    eventClick: (info: EventClickArg) => {
      if (!info.event.end) return;
      if (info.event.end.getTime() <= Date.now()) return;
      handleEventClick(info);
    },
    eventDataTransform: (eventInfo: EventInput) => ({
      ...eventInfo,
      editable: false,
    }),

    // styling
    viewClassNames: 'text-base w-full border-border',
    eventClassNames: 'break-words w-full text-center ',
    eventBorderColor: 'transparent',
    eventBackgroundColor: 'inherit',
    eventTextColor: 'inherit',
    weekNumbers: true,
    weekNumberFormat: { week: 'numeric' as const },
    weekNumberContent: (info: WeekNumberContentArg) => `${t.week} ${info.num}`,

    datesSet: handleDatesSet,

    // user reservations styling vs other users
    eventDidMount: (info: EventMountArg) => {
      const isOwn = info.event.extendedProps.userId === memberId;
      info.el.style.backgroundColor =
        (isOwn && isMember) || info.isMirror
          ? 'var(--primary)'
          : 'oklch(27.8% 0.033 256.848)';
    },
    dayCellDidMount: (info: DayCellMountArg) => {
      if (info.isToday) {
        info.el.style.backgroundColor = 'oklch(from var(--accent) l c h / 0.5)';
      } else if (info.isPast) {
        info.el.style.backgroundColor = 'var(--destructive)';
        info.el.style.opacity = '0.15';
      }
    },

    // view change
    windowResize: () => {
      if (manualView) return;
      const api = calendarRef.current?.getApi();
      if (!api) return;
      const nextView = decideView();

      if (api.view.type !== nextView) {
        api.changeView(nextView);
        onViewChange(nextView);
      }
    },
  };
}
