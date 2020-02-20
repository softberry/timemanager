import React, { useState, useCallback } from "react";

import {
  IInputProps,
  IconEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IInputCallback,
  DesignEnums,
} from "../../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Button from "../../buttons/button";
import Input from "../index";
const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

/** render All input elements from the list of values  */
function AllInputs({
  name,
  value = [],
  required,
  validate,
  infoCallback,
}: IInputProps): any {
  const valuesArray: string[] = Array.isArray(value) ? value : [];
  const InputElements = valuesArray.map((val, keyIndex) => {
    const field: IInputProps = {
      name: `${name}`,
      uniqueName: `${name}-${keyIndex}`,
      value: val,
      required,
      validate,
      infoCallback,
    };

    return (
      <div key={keyIndex}>
        <Input {...field} />
      </div>
    );
  });

  return InputElements;
}

/** Creates a group of input elements, which behaves like an  independent form element.
 * Children inputs inherits valid and required props from ``MultipleInput``.
 * As long as all child elements passes validations test, ``MultipleInput`` will be valid.
 */
function MultipleInput(props: IInputProps): any {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [inputProps, setInputProps] = useState({
    ...props,
    infoCallback: multifieldInfoCallback,
  });

  const fieldState = new Map();
  const [childrenInputsState, setChildrenInputsState] = useState(fieldState);

  function multifieldInfoCallback(returnedValue: IInputCallback) {
    const { name, uniqueName, value, valid } = returnedValue;

    const updatedFieldState = childrenInputsState;
    updatedFieldState.set(uniqueName, { valid, value, name });
    setChildrenInputsState(updatedFieldState);
    memoizedMultiFieldValidState();
  }

  const memoizedMultiFieldValidState = useCallback(() => {
    if (typeof props.infoCallback === "function") {
      const valid =
        Array.from(childrenInputsState.values()).filter(
          ({ valid }) => valid === false
        ).length === 0;
      const extractValueArray = Array.from(childrenInputsState.values()).map(
        ({ value }) => value
      );
      const filteredValue = extractValueArray.filter(v => v.length > 0);

      props.infoCallback({ ...props, value: filteredValue, valid });
    }
  }, [childrenInputsState, props]);

  function addNewFieldHandler() {
    const values: string[] = Array.isArray(inputProps.value)
      ? inputProps.value
      : [""];
    setInputProps({ ...inputProps, value: [...values, ""] });
  }

  return (
    <div className={styles[`MultipleInputContainer-${theme}`]}>
      <AllInputs {...inputProps} />
      <div className={styles[`MultipleInputContainer-${theme}-add-new`]}>
        <Button
          icon={IconEnums.ADD}
          type={ButtonTypeEnums.SIMPLE}
          onClick={addNewFieldHandler}
          isDisabled={false}
          align={ButtonAlignmentEnums.STRETCH}
        >
          New {props.name} field
        </Button>
      </div>
    </div>
  );
}

export default MultipleInput;
