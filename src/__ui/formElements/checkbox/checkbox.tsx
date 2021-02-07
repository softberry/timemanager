import { useState, useCallback, FC, ReactNode } from "react";
import { IconSizeEnums, IconNameEnums, ThemeEnums } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import Icon from "../../../__ui/icon";
const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

export interface ICheckBoxComponentProps {
  children?: ReactNode;
  /** *initial state to be set* */
  checked?: boolean;
  /** label text identifies the checkbox or radio element */
  label: string;
  /** value of the radio element, whihc will be assigend to radiogroup when it's selected */
  /** callback function to be don if checkbox or radio  changes it state */
  onChange: (checked?: boolean) => void;
}

/**
 * Checkbox Component
 */
const Checkbox: FC<ICheckBoxComponentProps> = ({
  children,
  checked = false,
  label,
  onChange,
}: ICheckBoxComponentProps) => {
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
      <div className={styles[`Checkbox-${theme}`]} onClick={checkOnChangeHandler}>
        {isChecked && <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_ON}</Icon>}
        {!isChecked && <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_OFF}</Icon>}
        <div className={styles[`Checkbox-${theme}-Label`]}>{label}</div>
        {children && <div className={styles[`Checkbox-${theme}-Content`]}>{children}</div>}
      </div>
    </>
  );
};

export default Checkbox;
