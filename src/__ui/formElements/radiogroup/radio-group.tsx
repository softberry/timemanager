import React, { useState, useEffect, useCallback, Children, FC, ReactNode } from "react";
import { ThemeEnums, ViewEnums } from "../../../__typings/interfaces.d";

import { RadioItem, IRadioItemProps } from "./radio-item";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useThemeStyle } from "../../typography";
export interface IRadioGroupProps {
  children?: ReactNode;
  onChange: (t: string | ViewEnums) => void;
}

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * Radio Component
 *
 */

export const RadioGroup: FC<IRadioGroupProps> = ({ children, onChange }: IRadioGroupProps) => {
  const [radioItemsProps, setRadioItemsProps] = useState<IRadioItemProps[]>([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [initialised, setInitialised] = useState(false);
  const [isValid, setIsValid] = useState("__INITIAL__");

  const styles = useThemeStyle(stylesMap);

  const radioGroupOnChangeCallback = useCallback(() => {
    if (typeof onChange === "function") {
      onChange(selectedItem);
    }
  }, [onChange, selectedItem]);

  const onRadioItemChangeHandler = (val: string | number = ""): void => {
    setSelectedItem(val.toString());
  };
  useEffect(() => {
    if (Children.count(children) === 0) return;
    const values = Children.map(children, child => React.isValidElement(child) && child.props.value) || [];
    let selecteds = 0;
    Children.forEach(children, child => {
      if (React.isValidElement(child) && child.props.checked === true) selecteds++;
    });

    if (values.length !== Children.count(children)) {
      setIsValid("Each Radio in RadioGroup must have a 'value'!");
      return;
    }
    if (selecteds > 1) {
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
    if (Children.count(children) === 0) return;
    if (!initialised && radioItemsProps.length === 0 && Children.count(children) > 0) {
      const propsList =
        Children.map(children, (child: ReactNode) => {
          if (!React.isValidElement(child)) return;
          const { children, label, checked, value } = child.props;
          if (checked) {
            setSelectedItem(value);
          }
          return {
            children,
            label,
            value,
          };
        }) || [];
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
            <RadioItem
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
};
