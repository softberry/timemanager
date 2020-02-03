import React, { useState, useEffect, useCallback } from "react";

import {
  IMultiInputProps,
  SizeIconEnums,
  IconEnums,
} from "../../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../../store/constant-enums";

import Icon from "../../icon";
import Input from "../index";
const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function AllInputs({
  name,
  value = [],
  getStateFromChildren = () => {},
}: IMultiInputProps): any {
  const [activeChildrenlength, setActiveChildrenlength] = useState(0);

  const isMultiFieldActive = useCallback(() => {
    if (activeChildrenlength === 0) {
      getStateFromChildren(false);
    } else {
      getStateFromChildren(true);
    }
  }, [activeChildrenlength, getStateFromChildren]);

  useEffect(isMultiFieldActive, [isMultiFieldActive]);

  const InputElements = value.map((val, keyIndex) => {
    const field = {
      name: `${name}`,
      value: val,
      required: true,
      fieldState: (n: any) => {
        const activeCount = n
          ? activeChildrenlength + 1
          : activeChildrenlength - 1;

        setTimeout(() => {
          setActiveChildrenlength(activeCount);
        }, 300);
      },
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
  const [multiFieldActiveState, setMultiFieldActiveState] = useState<boolean>(
    false
  );

  function getActiveStateFromChilds(childrenState: boolean) {
    setMultiFieldActiveState(childrenState);
  }

  return (
    <div
      className={styles[`MultipleInputContainer-${theme}`]}
      data-field-active={multiFieldActiveState}
    >
      <AllInputs {...props} getStateFromChildren={getActiveStateFromChilds} />

      <div className={styles[`MultipleInputContainer-${theme}-add-new`]}>
        <Icon size={SizeIconEnums.SMALL}>{IconEnums.ADD}</Icon>
        Add new {props.name} field
      </div>
    </div>
  );
}

export default MultipleInput;
