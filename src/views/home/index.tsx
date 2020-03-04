import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";

import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

import ViewContext from "../index";
import { ViewSettingsEnums, DesignEnums } from "../../__typings/interfaces.d";

function HomeView(): ReactElement {
  const dispatch = useDispatch();
  dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "" });

  return (
    <ViewContext.Provider value={DesignEnums.PRIMARY_VIEW}>
      <DefaultLayout>
        <Timer />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default HomeView;
