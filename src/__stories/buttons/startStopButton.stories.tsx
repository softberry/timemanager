import React from "react";
import StartStopButton from "../../__ui/buttons/startStopButton";
import StoryPage from "../story-page";

export default {
  title: "Buttons/Start Stop Button",
  component: StartStopButton
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <StartStopButton
        buttonLabel={{ inactive: "STOP", active: "WAIT" }}
        onComplete={() => {
          console.log("OK!");
        }}
      />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <StartStopButton
        buttonLabel={{ inactive: "STOP", active: "WAIT" }}
        onComplete={() => {
          console.log("OK!");
        }}
      />
    </StoryPage>
  );
};

