import React from "react";
import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../index";
function SettingsView() {
  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        <Settings view={VDESIGN.DESIGN_VIEW_SECONDARY} />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default SettingsView;
