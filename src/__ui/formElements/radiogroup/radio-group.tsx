import React, { useState, useEffect, useCallback } from "react";
import {
  IRadioGroupProps,
  IRadioItemProps
} from "../../../__typings/interfaces";

import Radio from "./radio";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useThemeStyle } from "../../typography";
import { VDESIGN } from "../../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

/**
 * Radio Component
 *
 */

export default function RadioGroup({ children, onChange }: IRadioGroupProps) {
  const [radioItemsProps, setRadioItemsProps] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [initialised, setInitialised] = useState(false);
  const [isValid, setIsValid] = useState("__INITIAL__");

  const styles = useThemeStyle(stylesMap);

  const radioGroupOnChangeCallback = useCallback(() => {
    if (typeof onChange === "function") {
      onChange(selectedItem);
    }
  }, [onChange, selectedItem]);

  const onRadioItemChangeHandler = (val: any) => {
    setSelectedItem(val);
  };
  useEffect(() => {
    const values = children.filter((child: any) => child.props.value);
    const selecteds = children.filter(
      (child: any) => child.props.checked === true
    );

    if (values.length !== children.length) {
      setIsValid("Each Radio in RadioGroup must have a 'value'!");
      return;
    }
    if (selecteds.length > 1) {
      setIsValid("Only one Radio can be selected at a time!");
      return;
    }

    setIsValid("__VALID__");
  }, [children]);

  useEffect(() => {
    if (isValid === "__INITIAL__") return;
    if (isValid === "__VALID__") return;
    throw new Error(isValid);
  }, [isValid]);

  useEffect(() => {
    if (!initialised && radioItemsProps.length === 0 && children.length > 0) {
      const propsList = children.map((child: any) => {
        const { children, label, checked, value } = child.props;
        if (checked) {
          setSelectedItem(value);
        }
        return {
          children,
          label,
          value
        };
      });
      setRadioItemsProps(propsList);
      setInitialised(true);
    }
    if (radioItemsProps.length === 0) return;
  }, [children, selectedItem, radioItemsProps, initialised]);

  useEffect(() => {
    radioGroupOnChangeCallback();
  }, [selectedItem, radioGroupOnChangeCallback]);
  return (
    <>
      <div className={styles.RadioGroup} data-value={selectedItem}>
        {radioItemsProps.map((props: IRadioItemProps, keyIndex: number) => {
          return (
            <Radio
              key={keyIndex}
              {...props}
              checked={selectedItem === props.value}
              onChange={onRadioItemChangeHandler}
            />
          );
        })}
      </div>
    </>
  );
}
