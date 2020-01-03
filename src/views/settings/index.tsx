import React from "react";
import { useDispatch } from "react-redux";
import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";
import TYPES from "../../store/action-types";
export default function() {
  useDispatch()({ type: TYPES.TOOLBAR_SETTINGS });
  return (
    <DefaultLayout>
      <Settings view={TYPES.DESIGN_VIEW_SECONDARY} />
    </DefaultLayout>
  );
}
