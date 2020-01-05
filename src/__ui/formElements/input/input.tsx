import React, { useState } from "react";
import { getTypeFromFieldName } from "../../../lib/input.helpers";

import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

/**
 * Input element:
 */
export default function Input({ id, name, value }: IInputComponentProps) {
  const [val, setVal] = useState<string>(value);
  const type = getTypeFromFieldName(name); // input type (text, tel, mail etc...)

  const TYPE_PLACEHOLDER = "TYPE_PLACEHOLDER";
  const TYPE_LABEL = "TYPE_PLACEHOLDER";

  const [labelPosition, setLabelPosition] = useState(
    val === "" ? TYPE_PLACEHOLDER : TYPE_LABEL
  );

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
      <label
        htmlFor={id}
        className={`${styles[labelPosition]} ${styles[`label-${theme}`]}`}
      >
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
