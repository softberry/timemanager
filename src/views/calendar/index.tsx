import React from "react";

import DefaultLayout from "../../layout/layout.default";
import Calendar from "../../components/calendar";
import ViewContext from "../index";
import { VDESIGN } from "../../store/constant-enums";
function CalendarView() {
  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        <Calendar />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}
export default CalendarView;
