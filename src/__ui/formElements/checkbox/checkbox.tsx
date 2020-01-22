import React, { useState, useCallback } from "react";
import { ICheckBoxComponentProps } from "../../../__typings/interfaces";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Checkbox Component
 *
 */
export default function Checkbox({
  children,
  checked = false,
  label,
  onChange,
}: ICheckBoxComponentProps) {
  if (typeof onChange !== "function") {
    console.error("Checkbox component must have onChange function.");
  }
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

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
        <div data-checked={isChecked}></div>
        <div className={styles[`Checkbox-${theme}-Label`]}>{label}</div>
        <div className={styles[`Checkbox-${theme}-Content`]}>{children}</div>
      </div>
    </>
  );
}
