import React, { useState } from "react";

import {
  IInputProps,
  IconEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
} from "../../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

import Button from "../../buttons/button";
import Input from "../index";
const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

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

function MultipleInput(props: IInputProps): any {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [inputProps, setInputProps] = useState(props);

  function addNewFieldHandler() {
    const values: string[] = Array.isArray(inputProps.value)
      ? inputProps.value
      : [];
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
          Add new {props.name} field
        </Button>
      </div>
    </div>
  );
}

export default MultipleInput;
