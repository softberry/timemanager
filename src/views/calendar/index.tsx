import React from "react";
import { useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import DefaultLayout from "../../layout/layout.default";
import Calendar from "../../components/calendar";
import ViewContext from "../index";
import { VDESIGN } from "../../store/constant-enums";
function CalendarView() {
  useDispatch()({ type: TYPES.TOOLBAR_CALENDAR });

  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        <Calendar />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}
export default CalendarView;
