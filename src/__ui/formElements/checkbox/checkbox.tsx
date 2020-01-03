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
      <div className={styles.Checkbox} onClick={checkOnChangeHandler}>
        <div
          className={
            isChecked ? styles.CheckboxIconSelected : styles.CheckboxIcon
          }
        ></div>
        <div className={styles.CheckboxLabel}>{label}</div>
        <div className={styles.CheckboxContent}>{children}</div>
      </div>
    </>
  );
}
