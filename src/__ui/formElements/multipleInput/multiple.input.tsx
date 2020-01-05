import React from "react";

import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

import Input from "../index";
const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function AllInputs({ id, name, value = [] }: IMultiInputProps): any {
  return value.map((val, keyIndex) => {
    const field = {
      id: `${id}-${keyIndex}`,
      name: `${name}`,
      value: val
    };
    return <Input key={keyIndex} {...field} />;
  });
}

export default function MultipleInput(props: IMultiInputProps): any {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <div className={styles[`MultipleInputContainer-${theme}`]}>
      <AllInputs {...props} />
    </div>
  );
}
