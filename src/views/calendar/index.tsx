import React from "react";
import { useDispatch } from "react-redux";
import EventsCalendar from "../../__ui/eventsCalendar";
import TYPES from "../../store/action-types";
import DefaultLayout from "../../layout/layout.default";

export default function() {
  useDispatch()({ type: TYPES.TOOLBAR_CALENDAR });

  return <DefaultLayout>
      <EventsCalendar />
  </DefaultLayout>;
}
