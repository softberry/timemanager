import React, { FunctionComponent } from "react";
import { IRadioItemProps, IconSizeEnums, IconNameEnums, ThemeEnums } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";

import Icon from "../../../__ui/icon";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Radio Component
 *
 */

const Radio: FunctionComponent<IRadioItemProps> = ({
  children,
  label = "",
  onChange = (): boolean => false,
  checked = false,
  value,
}) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      <div className={styles[`Radio-${theme}`]} onClick={(): void => onChange(value)} data-value={value}>
        {checked && <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.RADIO_ON}</Icon>}
        {!checked && <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.RADIO_OFF}</Icon>}
        <div className={styles[`Radio-${theme}-Label`]}>{label}</div>
        <div className={styles[`Radio-${theme}-Content`]}>{children}</div>
      </div>
    </>
  );
};

export default Radio;
