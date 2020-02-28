import React from "react";

import TimelogList from "../../components/timelogslist";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { DesignEnums } from "../../__typings/interfaces.d";

function TimelogsListView() {
  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <TimelogList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default TimelogsListView;
