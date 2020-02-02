import React from "react";
import { useDispatch } from "react-redux";
import EventsCalendar from "../../components/eventsCalendar";
import TYPES from "../../store/action-types";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { VDESIGN } from "../../store/constant-enums";
function CalendarView() {
  useDispatch()({ type: TYPES.TOOLBAR_CALENDAR });

  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        <EventsCalendar />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}
export default CalendarView;
