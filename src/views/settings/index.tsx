import React from "react";
import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { DesignEnums } from "../../__typings/interfaces.d";
function SettingsView() {
  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <Settings view={DesignEnums.SECONDARY_VIEW} />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default SettingsView;
