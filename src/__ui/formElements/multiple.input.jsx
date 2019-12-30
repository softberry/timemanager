import React from "react";
import Input from "./index";
import styles from "./multiple-input.module.scss";

function AllInputs({ id, name, value }) {
  return value.map((val, keyIndex) => {
    const field = {
      id: `${id}-${keyIndex}`,
      name: `${name}`,
      value: val
    };
    return <Input key={keyIndex} {...field} />;
  });
}

export default function MultipleInput(props) {
  return (
    <div className={styles.MultipleInputContainer}>
      <AllInputs {...props} />
    </div>
  );
}
