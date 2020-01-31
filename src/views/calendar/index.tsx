import React from "react";
import { useDispatch } from "react-redux";
import EventsCalendar from "../../components/eventsCalendar";
import TYPES from "../../store/action-types";
import DefaultLayout from "../../layout/layout.default";

function CalendarView() {
  useDispatch()({ type: TYPES.TOOLBAR_CALENDAR });

  return (
    <DefaultLayout>
      <EventsCalendar />
    </DefaultLayout>
  );
}
export default CalendarView;
