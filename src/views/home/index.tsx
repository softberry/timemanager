import React from "react";
import { useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

function HomeView() {
  useDispatch()({ type: TYPES.TOOLBAR_HOME });

  return (
    <DefaultLayout>
      <Timer view={VDESIGN.DESIGN_VIEW_PRIMARY} />
    </DefaultLayout>
  );
}

export default HomeView;
