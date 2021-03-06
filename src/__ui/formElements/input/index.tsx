import { useState, useEffect, useContext, useCallback, FC, ChangeEvent, FocusEvent, MouseEvent } from "react";
import {
  IconSizeEnums,
  LabelTypeEnums,
  IconNameEnums,
  ValidationTypeEnums,
  IInputCallback,
  ThemeEnums,
  PresetSuggestionEnums,
} from "../../../__typings/interfaces.d";
import Icon from "../../../__ui/icon";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../typography";
import ViewContext from "../../../views";
import { uuid } from "@nano-sql/core/lib/utilities";

import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isPostalCode from "validator/lib/isPostalCode";
import isNumeric from "validator/lib/isNumeric";
import isCurrency from "validator/lib/isCurrency";
import isDecimal from "validator/lib/isDecimal";
import SuggestionList from "../suggestion/suggestionList";
export interface IInputProps {
  /** Name of the input field */
  name: string;
  /** User freindly name of input element to be used as label text*/
  label: string;
  /**  */
  // uniqueName: string;
  /** Type of input element */
  type: "text" | "number" | "phone" | "mail" | "date" | "time";
  /** Value  of the input field */
  value?: string; //| string[] | Date;
  /** Define whether this field should have a value */
  required: boolean;
  /** Should be value of field to be validated. */
  validate: boolean;
  /** Defined the Validation rule which should be applied*/
  validationType?: ValidationTypeEnums;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback?: (p: IInputCallback) => void;
  /** if suggestion needed, define suggestionPresetQueryName  */
  suggestionTable?: PresetSuggestionEnums;
}
const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Input element:
 */
const Input: FC<IInputProps> = ({
  name,
  label,
  value = "",
  type = "text",
  required,
  validate = false,
  validationType,
  infoCallback,
  suggestionTable,
}: IInputProps) => {
  const id = uuid();
  const stringValueOfField: string = value?.toString() || "";
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>();
  const [val, setVal] = useState<string>(stringValueOfField);
  const [onBlurTimeStamp, setOnBlurTimeStamp] = useState(0);
  const [parentState, setParentState] = useState<IInputCallback>({
    name,
    value,
    valid: false,
  });
  const [, setErrorBoundry] = useState();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [labelType, setLabelType] = useState<LabelTypeEnums>(
    `${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL
  );
  const [isValid, setIsValid] = useState<boolean>(true);

  const updateParentCallback = useCallback(() => {
    if (typeof infoCallback === "function") {
      if (parentState.name === name && parentState.value === val && parentState.valid === isValid) return;
      const changedValueState: IInputCallback = {
        name,
        valid: isValid,
        value: val,
      };
      setParentState(changedValueState);
      infoCallback(changedValueState);
    }
  }, [isValid, infoCallback, name, val, parentState.name, parentState.valid, parentState.value]);

  useEffect(() => {
    setVal(value);
  }, [value]);

  useEffect(() => {
    if (validate) {
      if (required || `${val}`.length > 0) {
        if (validationType === undefined) {
          setErrorBoundry(() => {
            throw new Error(`Field : "${label}" should be validated. But validationType has not been defined.`);
          });
        }
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
          case ValidationTypeEnums.CURRENCY: {
            setIsValid(isCurrency(`${val}`));
            break;
          }
          case ValidationTypeEnums.DECIMAL: {
            setIsValid(isDecimal(`${val}`));
            break;
          }
          case ValidationTypeEnums.SUGGESTION: {
            console.log("get validation from SuggestionList");
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
  }, [setIsValid, required, validationType, val, validate, updateParentCallback, label]);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>): void {
    e.persist();
    !hasFocus && setHasFocus(true);
    setVal(e.currentTarget.value);
    setLabelType(`${e.currentTarget.value}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL);
  }

  function handleOnFocus(e: FocusEvent<HTMLInputElement>): void {
    e.persist();
    setLabelType(`${e.target.value}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL);
    setHasFocus(true);
    setInputElement(e.target);
  }

  function handleOnBlur(e: FocusEvent<HTMLInputElement>): void {
    setLabelType(`${e.target.value}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL);

    setInputElement(null);
    setHasFocus(false);
    setOnBlurTimeStamp(Date.now());
  }

  function handleClear(e: MouseEvent<HTMLDivElement>): void {
    inputElement && inputElement.focus && inputElement.focus();

    if (Date.now() - onBlurTimeStamp < 300) {
      setVal("");
    }
  }

  function handleOnSuggestionSelected(): void {
    //
  }

  useEffect(() => {
    if (val === null) return;
    setLabelType(`${val}`.length === 0 ? LabelTypeEnums.PLACEHOLDER : LabelTypeEnums.LABEL);
  }, [val]);

  return (
    <div className={styles[`Input-${theme}-${view}`]} data-valid={isValid}>
      <label htmlFor={id} className={styles[`Input-${theme}-label`]} data-type={labelType}>
        {label}
        {required ? "*" : ""}
      </label>
      <div className={styles[`Input-${theme}-Wrapper`]} data-has-focus={hasFocus}>
        <input
          id={id}
          name={name}
          type={type}
          value={val}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className={styles[`Input-${theme}-input`]}
          autoComplete="off"
        />
        {`${val}`.length > 0 && (
          <div className={styles[`Input-${theme}-btn-clear`]} onClick={handleClear} data-has-focus={hasFocus}>
            <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLEAR}</Icon>
          </div>
        )}
        {suggestionTable && (
          <SuggestionList query={val} table={suggestionTable} onSelect={handleOnSuggestionSelected} />
        )}
      </div>
    </div>
  );
};

export default Input;

/**
 *
 */
