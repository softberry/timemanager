import React, { ReactElement } from "react";

import DefaultLayout from "../../layout/layout.default";
import Calendar from "../../components/calendar";
import ViewContext from "../index";
import { ViewEnums } from "../../__typings/interfaces.d";
function CalendarView(): ReactElement {
  return (
    <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <Calendar />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}
export default CalendarView;
