import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DESIGN } from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
import { RadioGroup, Radio } from "../../__ui/formElements";

import { IDesignModel } from "../../__typings/interfaces";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();

stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);
export default function Settings({ view }: IDesignModel) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const viewClass = styles[`Settings-${theme}-${view}`];
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: any) => state.design.theme);
  return (
    <section className={viewClass}>
      <div className={styles[`SettingsHeader-${theme}`]}>
        <h1>Settings</h1>
      </div>
      <div className={styles[`SettingsColLeft-${theme}`]}>
        <div className={styles[`OptionListName-${theme}-Active`]}>Theme</div>
        <div className={styles[`OptionListName-${theme}`]}>Time Settings</div>
        <div className={styles[`OptionListName-${theme}`]}>
          Material List Settings
        </div>
      </div>
      <div className={styles[`SettingsColRight-${theme}`]}>
        <RadioGroup
          onChange={(val: string) => {
            dispatch({
              type: DESIGN.DESIGN_THEME,
              theme: val
            });
          }}
        >
          <Radio
            label="Default"
            value={VDESIGN.DESIGN_THEME_DEFAULT}
            checked={currentTheme === VDESIGN.DESIGN_THEME_DEFAULT}
          ></Radio>
          <Radio
            label="Ocean"
            value={VDESIGN.DESIGN_THEME_OCEAN}
            checked={currentTheme === VDESIGN.DESIGN_THEME_OCEAN}
          ></Radio>
        </RadioGroup>
      </div>
    </section>
  );
}
