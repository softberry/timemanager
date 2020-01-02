import React from "react";

import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";
import TYPES from "../../store/action-types";
export default function() {
  return (
    <DefaultLayout>
      <Settings view={TYPES.DESIGN_VIEW_SECONDARY} />
    </DefaultLayout>
  );
}
