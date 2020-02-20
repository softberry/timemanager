import React from "react";

import DefaultLayout from "../../layout/layout.default";
import Calendar from "../../components/calendar";
import ViewContext from "../index";
import { DesignEnums } from "../../__typings/interfaces.d";
function CalendarView() {
  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <Calendar />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}
export default CalendarView;
