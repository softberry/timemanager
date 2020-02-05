import React from "react";

import {
  IMultiInputProps,
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
}: IMultiInputProps): any {
  const InputElements = value.map((val, keyIndex) => {
    const field = {
      name: `${name}`,
      value: val,
      required,
      validate,
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

  return (
    <div className={styles[`MultipleInputContainer-${theme}`]}>
      <AllInputs {...props} />
      <div className={styles[`MultipleInputContainer-${theme}-add-new`]}>
        <Button
          icon={IconEnums.ADD}
          type={ButtonTypeEnums.SIMPLE}
          onClick={() => {}}
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
