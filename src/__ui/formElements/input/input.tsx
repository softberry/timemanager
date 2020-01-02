import React, { useState } from "react";
import { getTypeFromFieldName } from "../../../lib/input.helpers";

import styles from "./input.module.scss";

/**
 * Input element:
 */
export default function Input({ id, name, value }: IInputComponentProps) {
  const [val, setVal] = useState<string>(value);
  const type = getTypeFromFieldName(name);
  const [labelPosition, setLabelPosition] = useState(
    val === "" ? "PLACEHOLDER" : "LABEL"
  );

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val: string = e.target.value;
    setVal(val);
    `${val}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }

  function handleOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }
  function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    `${e.target.value}`.length === 0
      ? setLabelPosition("PLACEHOLDER")
      : setLabelPosition("LABEL");
  }

  if (val === null) return <></>;
  return (
    <div className={styles.Input}>
      <label htmlFor={id} className={styles[labelPosition]}>
        {name}
      </label>
      <input
        id={id}
        type={type}
        value={val}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
}
