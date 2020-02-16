import React from "react";
import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";
import { VDESIGN } from "../../store/constant-enums";

function SettingsView() {
  return (
    <DefaultLayout>
      <Settings view={VDESIGN.DESIGN_VIEW_SECONDARY} />
    </DefaultLayout>
  );
}

export default SettingsView;
