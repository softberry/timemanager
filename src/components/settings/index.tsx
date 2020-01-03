import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DESIGN } from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
import { RadioGroup, Radio } from "../../__ui/formElements";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

export default function Settings({ view }: IDesignModel) {
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });

  const viewClass = styles[`Settings-${view}`];
  const dispatch = useDispatch();
  const currentTheme = useSelector((state: any) => state.design.theme);
  return (
    <section className={viewClass}>
      <h1>Settings</h1>
      <p>Change Theme</p>
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
    </section>
  );
}
