import React, { ReactElement } from "react";
import Opions from "../../components/options";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { DesignEnums } from "../../__typings/interfaces.d";
function SettingsView(): ReactElement {
  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <Opions />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default SettingsView;
