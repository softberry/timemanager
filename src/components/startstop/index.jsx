import React, { useState } from "react";

import styles from "./styles.module.css";

function CounterLine({ rotation, index }) {
  const [show, updateShow] = useState(true);
  setTimeout(() => {
    updateShow(false);
  }, 50 * index);

  const lineRotation = {
    transform: `rotate(${rotation}deg)`
  };

  return show ? (
    <div className={styles.RotatingDot} style={lineRotation}></div>
  ) : (
    ""
  );
}

export default function StartStop({ callback }) {
  // const lines = new Array(360 / 5).fill(0);
  let i = 0;
  const [countDown, setCountDown] = useState(false);
  function init() {
    i = 0;
    setCountDown(true);
    setTimeout(callback, 3000);
  }
  function quit() {
    callback = () => {};
    setCountDown(false);
  }
  const Counter = countDown
    ? () => {
        i++;
        console.log(i);
        return <CounterLine key={i} index={i} rotation={i * 5 - 90} />;
      }
    : () => <span></span>;
  return (
    <div className={styles.ButtonContainer}>
      <Counter />
      <div className={styles.Button} onMouseDown={init} onMouseUp={quit}></div>
    </div>
  );
}
