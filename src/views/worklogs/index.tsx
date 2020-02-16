import React from "react";

import WorklogsList from "../../components/worklogslist";
import DefaultLayout from "../../layout/layout.default";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../index";

function WorklogsListView() {
  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        <WorklogsList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default WorklogsListView;
