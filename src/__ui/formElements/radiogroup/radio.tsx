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

  return (
    <>
      <div
        className={styles.Radio}
        onClick={() => onChange(value)}
        data-value={value}
      >
        <div
          className={checked ? styles.RadioIconSelected : styles.RadioIcon}
        ></div>
        <div className={styles.RadioLabel}>{label}</div>
        <div className={styles.RadioContent}>{children}</div>
      </div>
    </>
  );
}
