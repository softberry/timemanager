import Opions from "../../components/options";
import { FC } from "react";
import DefaultLayout from "../../layout/layout.default";
import ViewContext from "../index";
import { ViewEnums } from "../../__typings/interfaces.d";

const SettingsView: FC = () => {
  return (
    <>
      <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
        <DefaultLayout>
          <Opions />
        </DefaultLayout>
      </ViewContext.Provider>
    </>
  );
};

export default SettingsView;
