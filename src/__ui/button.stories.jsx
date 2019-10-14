import React from "react";
import StartStopButton from "../components/startStopButton";

export default {
  component: StartStopButton,
  title: "Button"
};

function onComplete() {
  alert("OK");
}
export const StartStop = () => (
  <StartStopButton onComplete={onComplete}></StartStopButton>
);
