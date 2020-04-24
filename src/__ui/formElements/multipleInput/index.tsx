import React, { FC, useReducer, useEffect, useMemo } from "react";

import {
  IconNameEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IInputCallback,
  ThemeEnums,
} from "../../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Button from "../../buttons/button";
import Input from "../index";
import { IInputProps } from "../input";

export interface IMultiInputProps {
  name: string;
  defaultProps: IInputProps;
  values: string[];
  valid: boolean[];
  hash?: string;
  callback: (p: IMultiInputCallback) => void;
}

export interface IMultiInputCallback {
  name: string;
  value: string[];
  valid: boolean;
}

export interface IMultiInputActions {
  type: string;
  value?: string;
  index: number;
  valid: boolean;
}

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

function formReducer(state: IMultiInputProps, action: IMultiInputActions): IMultiInputProps {
  switch (action.type) {
    case "ADD": {
      const newState = {
        ...state,
        values: [...state.values, ""],
        valid: [...state.valid, false],
      };
      return {
        ...newState,
        hash: JSON.stringify(newState),
      };
    }
    case "REMOVE": {
      if (action.index === undefined) return state;

      const newState =
        state.values.length === 1
          ? {
              ...state,
              values: [""],
              valid: [false],
            }
          : {
              ...state,
              values: state.values.filter((v: string, i: number) => i !== action.index),
              valid: state.valid.filter((v: boolean, i: number) => i !== action.index),
            };
      return {
        ...newState,
        hash: JSON.stringify(newState),
      };
    }
    case "EDIT": {
      if (action.index < 0) return state;
      const newState = {
        ...state,
        values: state.values.map((val, i) => (i === action.index ? action?.value || "" : val)),
        valid: state.valid.map((val, i) => (i === action.index ? action.valid : val)),
      };

      return {
        ...newState,
        hash: JSON.stringify(newState),
      };
    }
    default: {
      return { ...state };
    }
  }
}

/** Creates a group of input elements, which behaves like an  independent form element.
 * Children inputs inherits valid and required props from ``MultipleInput``.
 * As long as all child elements passes validations test, ``MultipleInput`` will be valid.
 */
const MultipleInput: FC<IMultiInputProps> = ({
  name,
  defaultProps,
  values,
  valid,
  hash = "",
  callback,
}: IMultiInputProps) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [form, disatchForm] = useReducer(formReducer, {
    name,
    defaultProps,
    values,
    valid,
    hash,
    callback,
  });

  const memoizedCallbackData = useMemo(() => {
    const valid = form.valid.reduce((prev: boolean, cur: boolean) => prev === true && cur === true);
    return {
      name: form.name,
      valid,
      value: form.values,
      hash: form.hash,
    };
  }, [form.name, form.values, form.valid, form.hash]);

  function addNewFieldHandler(): void {
    disatchForm({ type: "ADD", index: -1, valid: false });
  }

  function removeField(index: number, value: string): void {
    if (form.values[index] === value) {
      disatchForm({ type: "REMOVE", index, value, valid: false });
    }
  }

  function updateForm(p: IInputCallback): void {
    const index = parseInt(p.name);
    if (form.values[index] === p.value && form.valid[index] === p.valid) return;

    disatchForm({ type: "EDIT", index, value: p.value, valid: p.valid });
  }
  useEffect(() => {
    callback(memoizedCallbackData);
  }, [callback, memoizedCallbackData, form.hash]);

  return (
    <div className={styles[`MultipleInputContainer-${theme}`]}>
      {form.values.map((value: string, i: number) => {
        return (
          <div key={i} className={styles.InputWrapper}>
            <div className={styles["InputWrapper-input"]}>
              <Input {...form.defaultProps} name={`${i}`} value={value} infoCallback={updateForm} />
            </div>
            <div className={styles["InputWrapper-icon"]}>
              <Button
                onClick={(): void => {
                  removeField(i, value);
                }}
                icon={IconNameEnums.TRASH}
                align={ButtonAlignmentEnums.INLINE}
                isDisabled={false}
                type={ButtonTypeEnums.WARNING}
              ></Button>
            </div>
          </div>
        );
      })}
      <div className={styles[`MultipleInputContainer-${theme}-add-new`]}>
        <Button
          icon={IconNameEnums.ADD}
          type={ButtonTypeEnums.SIMPLE}
          onClick={addNewFieldHandler}
          isDisabled={false}
          align={ButtonAlignmentEnums.STRETCH}
        >
          {`New ${defaultProps.label} field`}
        </Button>
      </div>
    </div>
  );
};

export default MultipleInput;
