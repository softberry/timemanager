import React from "react";

import WorklogsList from "../../components/worklogslist";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { DesignEnums } from "../../__typings/interfaces.d";

function WorklogsListView() {
  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <WorklogsList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default WorklogsListView;
