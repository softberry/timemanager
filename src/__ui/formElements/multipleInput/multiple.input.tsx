import React from "react";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

import Input from "../index";

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
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });

  return (
    <div className={styles.MultipleInputContainer}>
      <AllInputs {...props} />
    </div>
  );
}
