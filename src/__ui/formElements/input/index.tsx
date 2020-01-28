import React, { useState, useEffect } from "react";
import {
  IInputProps,
  ESizeIcon,
  ELabelTypes,
} from "../../../__typings/interfaces.d";
import Icon from "../../../__ui/icon";

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
function Input({
  name,
  value,
  fieldState = () => {},
  required,
  validate,
}: IInputProps) {
  const id = uuid();
  const [inputElement, setInputElement] = useState<any>(null);
  const [val, setVal] = useState<string>(value);

  /*********************************************** */
  //TODO:  Use debounced validation rule.
  //       If validation type define use it, if not use default validation rule
  //TODO:  Define Required style
  /*********************************************** */

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [labelType, setLabelType] = useState<ELabelTypes>(
    `${val}`.length === 0 ? ELabelTypes.PLACEHOLDER : ELabelTypes.LABEL
  );
  const type = getTypeFromFieldName(name); // input type (text, tel, mail etc...)

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val: string = e.target.value;
    !hasFocus && setHasFocus(true);
    setVal(val);
    setLabelType(
      `${val}`.length === 0 ? ELabelTypes.PLACEHOLDER : ELabelTypes.LABEL
    );
  }

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    setLabelType(
      `${e.target.value}`.length === 0
        ? ELabelTypes.PLACEHOLDER
        : ELabelTypes.LABEL
    );
    setHasFocus(true);
    fieldState(true);
    setInputElement(null);
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    setLabelType(
      `${e.target.value}`.length === 0
        ? ELabelTypes.PLACEHOLDER
        : ELabelTypes.LABEL
    );
    fieldState(false);
    setTimeout(() => {
      setHasFocus(false);
    }, 300);

    setInputElement(e.target);
  }

  function handleClear() {
    inputElement && inputElement.focus && inputElement.focus();
    setVal("");
  }
  useEffect(() => {
    if (val === null) return;
    setLabelType(
      `${val}`.length === 0 ? ELabelTypes.PLACEHOLDER : ELabelTypes.LABEL
    );
  }, [val]);

  return (
    <div className={styles[`Input-${theme}`]}>
      <label
        htmlFor={id}
        className={styles[`Input-${theme}-label`]}
        data-type={labelType}
      >
        {name}
      </label>
      <div
        className={styles[`Input-${theme}-Wrapper`]}
        data-has-focus={hasFocus}
      >
        <input
          id={id}
          type={type}
          value={val}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className={styles[`Input-${theme}-input`]}
        />
        {hasFocus && `${val}`.length > 0 && (
          <div
            className={styles[`Input-${theme}-btn-clear`]}
            onClick={handleClear}
          >
            <Icon size={ESizeIcon.SMALL}>highlight_off</Icon>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
