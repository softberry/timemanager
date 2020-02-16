import React from "react";
import { useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

import ViewContext from "../index";

function HomeView() {
  const dispatch = useDispatch();
  dispatch({ type: TYPES.VIEWSETTINGS.UPDATE_TITLE, title: "" });

  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_PRIMARY}>
      <DefaultLayout>
        <Timer />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default HomeView;
