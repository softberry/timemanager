import { FC, ReactNode } from "react";
import { IconSizeEnums, IconNameEnums, ThemeEnums } from "../../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";

import Icon from "../../icon";

export interface IRadioItemProps {
  children?: ReactNode;
  /** *initial state to be set* */
  checked?: boolean;
  /** label text identifies the checkbox or radio element */
  label: string;
  /** value of the radio element, whihc will be assigend to radiogroup when it's selected */
  value: string;
  /** callback function to be don if checkbox or radio  changes it state */
  onChange?: (val?: string) => void;
}

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Radio Component
 *
 */

export const RadioItem: FC<IRadioItemProps> = ({
  children,
  label = "",
  onChange = (): boolean => false,
  checked = false,
  value,
}: IRadioItemProps) => {
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
