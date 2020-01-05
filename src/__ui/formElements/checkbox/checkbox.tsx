import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

/**
 * Checkbox Component
 *
 */
export default function Checkbox({
  children,
  checked = false,
  label,
  onChange
}: ICheckBoxComponentProps) {
  if (typeof onChange !== "function") {
    console.error("Checkbox component must have onChange function.");
  }
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
  const [isChecked, setIsChecked] = useState(checked);
  const memoizedChecked = useCallback(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  function checkOnChangeHandler() {
    setIsChecked(!isChecked);
    memoizedChecked();
  }

  return (
    <>
      <div
        className={styles[`Checkbox-${theme}`]}
        onClick={checkOnChangeHandler}
      >
        <div
          className={
            isChecked
              ? styles[`Checkbox-${theme}-IconSelected`]
              : styles[`Checkbox-${theme}-Icon`]
          }
        ></div>
        <div className={styles[`Checkbox-${theme}-Label`]}>{label}</div>
        <div className={styles[`Checkbox-${theme}-Content`]}>{children}</div>
      </div>
    </>
  );
}
