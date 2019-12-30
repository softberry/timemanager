import React, { useState, useEffect } from "react";
import Radio from "./radio";
import PropTypes from "prop-types";
import styles from "./radio.module.scss";

/**
 * Radio Component
 *
 */

export default function RadioGroup({ children }) {
  const [radioItemsProps, setRadioItemsProps] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (!initialised && radioItemsProps.length === 0 && children.length > 0) {
      const propsList = children.map(child => {
        const { children, label, checked, value } = child.props;
        if (checked) {
          setSelectedItem(value);
        }
        return {
          children,
          label,
          value,
          onChange: onChangeHandler
        };
      });
      setRadioItemsProps(propsList);
      setInitialised(true);
    }
    if (radioItemsProps.length === 0) return;
  }, [children, selectedItem, radioItemsProps, initialised]);

  function onChangeHandler(el) {
    setSelectedItem(el);
  }
  return (
    <>
      <div className={styles.RadioGroup} value={selectedItem}>
        {radioItemsProps.map((props, keyIndex) => {
          return (
            <Radio
              key={keyIndex}
              {...props}
              checked={selectedItem === props.value}
            />
          );
        })}
      </div>
    </>
  );
}

RadioGroup.propTypes = {
  children: PropTypes.array
};
