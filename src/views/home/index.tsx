import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";

import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

import ViewContext from "../index";
import { ViewSettingsEnums, ViewEnums } from "../../__typings/interfaces.d";

function HomeView(): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "" });
  });

  return (
    <ViewContext.Provider value={ViewEnums.PRIMARY_VIEW}>
      <DefaultLayout>
        <Timer />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default HomeView;
