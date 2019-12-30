import React from "react";
import PropTypes from "prop-types";
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
}) {
  function radioOnChangeHandler(e) {
    e.preventDefault();
    const value = e.currentTarget.getAttribute("value");
    return onChange(value);
  }
  return (
    <>
      <div
        className={styles.Radio}
        onClick={radioOnChangeHandler}
        value={value}
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

Radio.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  children: PropTypes.element,
  onChange: PropTypes.func
};
