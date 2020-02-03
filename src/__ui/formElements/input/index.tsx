import React, { useState, useEffect, useContext } from "react";
import {
  IInputProps,
  SizeIconEnums,
  LabelTypeEnums,
  IconEnums,
  //ValidationTypeEnums,
} from "../../../__typings/interfaces.d";
import Icon from "../../../__ui/icon";

import { getTypeFromFieldName } from "../../../lib/input.helpers";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { VDESIGN } from "../../../store/constant-enums";
import ViewContext from "../../../views";
import { uuid } from "@nano-sql/core/lib/utilities";

import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
// ValidationTypeEnums.MAIL
// ValidationTypeEnums.MOBILE
// ValidationTypeEnums.PHONE
// ValidationTypeEnums.TEXT
// ValidationTypeEnums.ZIP

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
  validate = true,
}: IInputProps) {
  const id = uuid();
  const [inputElement, setInputElement] = useState<any>(null);
  const [val, setVal] = useState<string>(value);
  const view = useContext(ViewContext);
  /*********************************************** */
  //TODO:  Use debounced validation rule.
  //       If validation type define use it, if not use default validation rule
  //TODO:  Define Required style
  /*********************************************** */

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [labelType, setLabelType] = useState<LabelTypeEnums>(
    `${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL
  );
  const [isValid, setIsValid] = useState<boolean>(true);
  const type = getTypeFromFieldName(name); // input type (text, tel, mail etc...)

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  useEffect(() => {
    if (validate) {
      if (required || `${val}`.length > 0) {
        switch (type) {
          case "mail": {
            setIsValid(isEmail(`${val}`));
            break;
          }
          case "phone": {
            setIsValid(isMobilePhone(`${val}`, "de-DE"));
            break;
          }
          case "zip": {
            setIsValid(isPostalCode(`${val}`, "DE"));
            break;
          }
          default:
            setIsValid(`${val}`.length > 0);
        }
      }
    } else {
      if (required) {
        setIsValid(`${val}`.length > 0);
      } else {
        setIsValid(true);
      }
    }
  }, [setIsValid, required, type, val, validate]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val: string = e.target.value;
    !hasFocus && setHasFocus(true);
    setVal(val);
    setLabelType(
      `${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL
    );
  }

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    setLabelType(
      `${e.target.value}`.length === 0
        ? LabelTypeEnums.PLACEHOLDER
        : LabelTypeEnums.LABEL
    );
    setHasFocus(true);
    fieldState(true);
    setInputElement(null);
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    setLabelType(
      `${e.target.value}`.length === 0
        ? LabelTypeEnums.PLACEHOLDER
        : LabelTypeEnums.LABEL
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
      `${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL
    );
  }, [val]);

  return (
    <div className={styles[`Input-${theme}-${view}`]} data-valid={isValid}>
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
            <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLEAR}</Icon>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;