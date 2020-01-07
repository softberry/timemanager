import React, { useState } from "react";
import { getTypeFromFieldName } from "../../../lib/input.helpers";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { VDESIGN } from "../../../store/constant-enums";
import { uuid } from "@nano-sql/core/lib/utilities";



const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Input element:
 */
export default function Input({ name, value }: IInputComponentProps) {
  const id = uuid();
  const [val, setVal] = useState<string>(value);
  const type = getTypeFromFieldName(name); // input type (text, tel, mail etc...)

  const TYPE_PLACEHOLDER = "TYPE_PLACEHOLDER";
  const TYPE_LABEL = "TYPE_LABEL";

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [labelPosition, setLabelPosition] = useState(
    val.length === 0 ? `${TYPE_PLACEHOLDER}-${theme}` : `${TYPE_LABEL}-${theme}`
  );

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val: string = e.target.value;
    setVal(val);
    `${val}`.length === 0
      ? setLabelPosition(`${TYPE_PLACEHOLDER}-${theme}`)
      : setLabelPosition(`${TYPE_LABEL}-${theme}`);
  }

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    `${e.target.value}`.length === 0
      ? setLabelPosition(`${TYPE_PLACEHOLDER}-${theme}`)
      : setLabelPosition(`${TYPE_LABEL}-${theme}`);
  }
  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    `${e.target.value}`.length === 0
      ? setLabelPosition(`${TYPE_PLACEHOLDER}-${theme}`)
      : setLabelPosition(`${TYPE_LABEL}-${theme}`);
  }

  if (val === null) return <></>;
  return (
    <div className={styles[`Input-${theme}`]}>
      <label htmlFor={id} className={styles[`${labelPosition}`]}>
        {name}
      </label>
      <input
        id={id}
        className={`${styles[`input-${theme}`]}`}
        type={type}
        value={val}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
}
