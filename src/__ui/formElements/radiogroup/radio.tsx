import React from "react";
import { IRadioItemProps, ISizeIcon } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { VDESIGN } from "../../../store/constant-enums";

import Icon from "../../../__ui/icon";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Radio Component
 *
 */

export default function Radio({
  children,
  label = "",
  onChange = () => {},
  checked = false,
  value,
}: IRadioItemProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      <div
        className={styles[`Radio-${theme}`]}
        onClick={() => onChange(value)}
        data-value={value}
      >

        {checked && <Icon size={ISizeIcon.SMALL}>radio_button_checked</Icon>}
        {!checked && <Icon size={ISizeIcon.SMALL}>radio_button_unchecked</Icon>}
        <div className={styles[`Radio-${theme}-Label`]}>{label}</div>
        <div className={styles[`Radio-${theme}-Content`]}>{children}</div>
      </div>
    </>
  );
}
