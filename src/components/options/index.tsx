import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RadioGroup, Radio } from "../../__ui/formElements";

import {
  IDesignModel,
  IDesign,
  ViewSettingsEnums,
  DesignEnums,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();

stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);
function Options({ view }: IDesignModel) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const viewClass = styles[`Options-${theme}-${view}`];
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: any) => state.design.theme);
  dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "Options" });
  return (
    <section className={viewClass}>
      <div>Theme</div>
      <div>
        <RadioGroup
          onChange={(val: string) => {
            dispatch({
              type: IDesign.THEME,
              theme: val,
            });
          }}
        >
          <Radio
            label="Default"
            value={DesignEnums.DEFAULT_THEME}
            checked={currentTheme === DesignEnums.DEFAULT_THEME}
          ></Radio>
          <Radio
            label="Ocean"
            value={DesignEnums.OCEAN_THEME}
            checked={currentTheme === DesignEnums.OCEAN_THEME}
          ></Radio>
        </RadioGroup>
      </div>
    </section>
  );
}

export default Options;
