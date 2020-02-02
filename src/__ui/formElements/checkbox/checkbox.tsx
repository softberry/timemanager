import React, { useState, useCallback } from "react";
import {
  ICheckBoxComponentProps,
  ESizeIcon,
} from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import Icon from "../../../__ui/icon";
const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Checkbox Component
 */
function Checkbox({
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
        {isChecked && <Icon size={ESizeIcon.SMALL}>check_box</Icon>}
        {!isChecked && (
          <Icon size={ESizeIcon.SMALL}>check_box_outline_blank</Icon>
        )}
        <div className={styles[`Checkbox-${theme}-Label`]}>{label}</div>
        {children && (
          <div className={styles[`Checkbox-${theme}-Content`]}>{children}</div>
        )}
      </div>
    </>
  );
}

export default Checkbox;
