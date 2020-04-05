import React, { ReactElement } from "react";

import Appointments from "../../components/appointments";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { ViewEnums } from "../../__typings/interfaces.d";

function CalendarView(): ReactElement {
  return (
    <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <Appointments />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default CalendarView;
