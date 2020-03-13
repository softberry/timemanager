import React, { ReactElement } from "react";

import TimelogList from "../../components/timelogslist";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { ViewEnums } from "../../__typings/interfaces.d";

function TimelogsListView(): ReactElement {
  return (
    <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <TimelogList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default TimelogsListView;
