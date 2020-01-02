import React from "react";
import styles from "./radio.module.scss";
/**
 * Radio Component
 *
 */

export default function Radio({
  children,
  label = "",
  onChange,
  checked = false,
  value
}: IRadioItemProps) {
  return (
    <>
      <div
        className={styles.Radio}
        onClick={() => onChange(value)}
        data-value={value}
      >
        <div
          className={checked ? styles.RadioIconSelected : styles.RadioIcon}
        ></div>
        <div className={styles.RadioLabel}>{label}</div>
        <div className={styles.RadioContent}>{children}</div>
      </div>
    </>
  );
}
