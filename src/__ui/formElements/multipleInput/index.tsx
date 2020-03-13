import React, { FunctionComponent, useReducer } from "react";

import {
  IconNameEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IInputCallback,
  ThemeEnums,
  IMultiInputProps,
} from "../../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Button from "../../buttons/button";
import Input from "../index";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

//TODO: move these interfaces to interfaces.d.ts
interface IMultiInputActions {
  type: string;
  value?: string;
  index: number;
}

function formReducer(
  state: IMultiInputProps,
  action: IMultiInputActions
): IMultiInputProps {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        values: [...state.values, ""],
      };

    case "REMOVE":
      if (action.index === undefined) return state;
      if (state.values[action.index] === action.value) {
        state.values = state.values.filter(
          (v: string, i: number) => v !== action.value
        );
      }

      return {
        ...state,
      };
    case "EDIT":
      if (action.index < 0) return state;
      state.values[action.index] = action?.value || "";

      return {
        ...state,
      };
    default: {
      return { ...state };
    }
  }
}

/** Creates a group of input elements, which behaves like an  independent form element.
 * Children inputs inherits valid and required props from ``MultipleInput``.
 * As long as all child elements passes validations test, ``MultipleInput`` will be valid.
 */
const MultipleInput: FunctionComponent<IMultiInputProps> = ({
  name,
  defaultProps,
  values,
  callback,
}) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const [form, disatchForm] = useReducer(formReducer, {
    name,
    defaultProps,
    values,
    callback,
  });

  function addNewFieldHandler(): void {
    disatchForm({ type: "ADD", index: -1 });
  }

  function removeField(index: number, value: string): void {
    if (form.values[index] === value) {
      disatchForm({ type: "REMOVE", index, value });
    }
  }

  function updateForm(p: IInputCallback): void {
    const index = parseInt(p.uniqueName);
    if (form.values[index] === p.value) return;
    disatchForm({ type: "EDIT", index, value: p.value });
  }

  return (
    <div className={styles[`MultipleInputContainer-${theme}`]}>
      {form.values.map((value: string, i: number) => (
        <div key={i} className={styles.InputWrapper}>
          <div className={styles["InputWrapper-input"]}>
            <Input
              {...form.defaultProps}
              uniqueName={`${i}`}
              value={value}
              infoCallback={updateForm}
            />
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
      ))}
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
