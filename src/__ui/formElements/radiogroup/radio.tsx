import React from "react";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

/**
 * Radio Component
 *
 */

export default function Radio({
  children,
  label = "",
  onChange,
  checked = false,
  value
}: IRadioItemProps) {
  let theme = VDESIGN.DESIGN_THEME_DEFAULT;
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });

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
