import React from "react";
import { IRadioItemProps } from "../../../__typings/interfaces";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { VDESIGN } from "../../../store/constant-enums";

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
  value
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
        <div
          className={
            checked
              ? styles[`Radio-${theme}-IconSelected`]
              : styles[`Radio-${theme}-Icon`]
          }
        ></div>
        <div className={styles[`Radio-${theme}-Label`]}>{label}</div>
        <div className={styles[`Radio-${theme}-Content`]}>{children}</div>
      </div>
    </>
  );
}
