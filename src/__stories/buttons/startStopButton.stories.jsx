import React from "react";
import StartStopButton from "../../__ui/buttons/startStopButton";
import styles from "../default.module.scss";

export default {
  title: "Start Stop Button"
};

export const primary = () => {
  return (
    <div className={styles.PrimaryView}>
      <StartStopButton
        buttonLabel={{ inactive: "STOP", active: "WAIT" }}
        onComplete={() => {
          console.log("OK!");
        }}
      />
    </div>
  );
};

export const secondary = () => {
  return (
    <div className={styles.SecondaryView}>
      <StartStopButton
        buttonLabel={{ inactive: "STOP", active: "WAIT" }}
        onComplete={() => {
          console.log("OK!");
        }}
      />
    </div>
  );
};
