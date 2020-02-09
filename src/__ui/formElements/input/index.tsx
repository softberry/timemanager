import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  IInputProps,
  SizeIconEnums,
  LabelTypeEnums,
  IconEnums,
  ValidationTypeEnums,
  IInputCallback,
} from "../../../__typings/interfaces.d";
import Icon from "../../../__ui/icon";

import getFormElementType from "../../../lib/input.helpers";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import { VDESIGN } from "../../../store/constant-enums";
import ViewContext from "../../../views";
import { uuid } from "@nano-sql/core/lib/utilities";

import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import isNumeric from "validator/lib/isNumeric";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Input element:
 */
function Input({
  name,
  uniqueName,
  value,
  required,
  validate = false,
  infoCallback,
}: IInputProps) {
  const id = uuid();
  const stringValueOfField: string = value ? value.toString() : "";
  const [inputElement, setInputElement] = useState<any>(null);
  const [val, setVal] = useState<string>(stringValueOfField);
  const view = useContext(ViewContext);

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [labelType, setLabelType] = useState<LabelTypeEnums>(
    `${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL
  );
  const [isValid, setIsValid] = useState<boolean>(true);
  const { type, ValidationType } = getFormElementType(name); // input type (text, tel, mail etc...)

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const updateParentCallback = useCallback(() => {
    if (typeof infoCallback === "function") {
      const changedValueState: IInputCallback = {
        uniqueName,
        name,
        valid: isValid,
        value: val,
      };
      infoCallback(changedValueState);
    }
  }, [isValid, uniqueName, infoCallback, name, val]);

  useEffect(() => {
    if (validate) {
      if (required || `${val}`.length > 0) {
        switch (ValidationType) {
          case ValidationTypeEnums.MAIL: {
            setIsValid(isEmail(`${val}`));
            break;
          }
          case ValidationTypeEnums.MOBILE: {
            setIsValid(isMobilePhone(`${val}`, "de-DE"));
            break;
          }
          case ValidationTypeEnums.PHONE: {
            //TODO: Use phone number validation as as you type from :
            //https://www.npmjs.com/package/libphonenumber-js
            setIsValid(isNumeric(`${val}`));
            break;
          }
          case ValidationTypeEnums.ZIP: {
            setIsValid(isPostalCode(`${val}`, "DE"));
            break;
          }
          default:
            setIsValid(`${val}`.length > 0);
        }
      } else {
        setIsValid(true);
      }
    } else {
      setIsValid(true);
    }
    updateParentCallback();
  }, [
    setIsValid,
    required,
    ValidationType,
    val,
    validate,
    updateParentCallback,
  ]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val: string = e.currentTarget.value;
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
    setInputElement(null);
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.persist();
    setLabelType(
      `${e.target.value}`.length === 0
        ? LabelTypeEnums.PLACEHOLDER
        : LabelTypeEnums.LABEL
    );
    setTimeout(() => {
      e.persist();
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
        {required ? "*" : ""}
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
