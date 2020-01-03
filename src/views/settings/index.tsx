import React from "react";
import { useDispatch } from "react-redux";
import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";
import TYPES from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
export default function() {
  useDispatch()({ type: TYPES.TOOLBAR_SETTINGS });
  return (
    <DefaultLayout>
      <Settings view={VDESIGN.DESIGN_VIEW_SECONDARY} />
    </DefaultLayout>
  );
}
