import React, { useState } from "react";

import {
  IMultiInputProps,
  IconEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IInputProps,
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
}: IMultiInputProps): any {
  const InputElements = value.map((val, keyIndex) => {
    const field:IInputProps = {
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

function MultipleInput(props: IMultiInputProps): any {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [inputProps, setInputProps] = useState(props);

  function addNewFieldHandler() {
    setInputProps({ ...inputProps, value: [...inputProps.value, ""] });
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
