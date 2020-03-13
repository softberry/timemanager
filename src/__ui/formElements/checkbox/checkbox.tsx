import React, { useState, useCallback, FunctionComponent } from "react";
import {
  ICheckBoxComponentProps,
  IconSizeEnums,
  IconNameEnums,
  ThemeEnums,
} from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import Icon from "../../../__ui/icon";
const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Checkbox Component
 */
const Checkbox: FunctionComponent<ICheckBoxComponentProps> = ({
  children,
  checked = false,
  label,
  onChange,
}) => {
  if (typeof onChange !== "function") {
    console.error("Checkbox component must have onChange function.");
  }
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [isChecked, setIsChecked] = useState(checked);
  const memoizedChecked = useCallback(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

  function checkOnChangeHandler(): void {
    setIsChecked(!isChecked);
    memoizedChecked();
  }

  return (
    <>
      <div
        className={styles[`Checkbox-${theme}`]}
        onClick={checkOnChangeHandler}
      >
        {isChecked && (
          <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_ON}</Icon>
        )}
        {!isChecked && (
          <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_OFF}</Icon>
        )}
        <div className={styles[`Checkbox-${theme}-Label`]}>{label}</div>
        {children && (
          <div className={styles[`Checkbox-${theme}-Content`]}>{children}</div>
        )}
      </div>
    </>
  );
};

export default Checkbox;
