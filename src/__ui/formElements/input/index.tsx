import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  IInputProps,
  IconSizeEnums,
  LabelTypeEnums,
  IconNameEnums,
  ValidationTypeEnums,
  IInputCallback,
  DesignEnums,
  IFieldNameToType,
} from "../../../__typings/interfaces.d";
import Icon from "../../../__ui/icon";

import fieldNameToType from "../../../lib/input.helpers";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import ViewContext from "../../../views";
import { uuid } from "@nano-sql/core/lib/utilities";

import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import isNumeric from "validator/lib/isNumeric";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

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
  const { type, validationType }: IFieldNameToType = fieldNameToType(name); // input type (text, tel, mail etc...)

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  let timeoutId: any = -1;

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
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId, hasFocus]);

  useEffect(() => {
    if (validate) {
      if (required || `${val}`.length > 0) {
        switch (validationType) {
          case ValidationTypeEnums.MAIL: {
            setIsValid(isEmail(`${val}`));
            break;
          }
          case ValidationTypeEnums.MOBILE: {
            setIsValid(isMobilePhone(`${val}`, "de-DE"));
            break;
          }
          case ValidationTypeEnums.PHONE: {
            //TODO: Phone number validation - Implement as you type #64
            //https://github.com/softberry/timemanager/issues/64
            setIsValid(isNumeric(`${val}`));
            break;
          }
          case ValidationTypeEnums.ZIP: {
            setIsValid(isPostalCode(`${val}`, "DE"));
            break;
          }
          case ValidationTypeEnums.DATE: {
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
    validationType,
    val,
    validate,
    updateParentCallback,
  ]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.persist();
    const val: string = e.currentTarget.value;
    !hasFocus && setHasFocus(true);
    setVal(val);
    setLabelType(
      `${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL
    );
  }

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.persist();
    setLabelType(
      `${e.target.value}`.length === 0
        ? LabelTypeEnums.PLACEHOLDER
        : LabelTypeEnums.LABEL
    );
    setHasFocus(true);
    setInputElement(e.target);
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    setLabelType(
      `${e.target.value}`.length === 0
        ? LabelTypeEnums.PLACEHOLDER
        : LabelTypeEnums.LABEL
    );

    timeoutId = setTimeout(() => {
      setInputElement(null);
      setHasFocus(false);
    }, 300);
  }

  function handleClear(e: React.MouseEvent<HTMLDivElement>) {
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
            <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLEAR}</Icon>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
