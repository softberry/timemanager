import React from "react";

import StartStopButton from "../../__ui/buttons/startStopButton";
import StoryPage from "../story-page";

export default {
  title: "Buttons/Start Stop Button",
  component: StartStopButton,
  parameters: {
    componentSubtitle: "Delayed callback button"
  }
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <StartStopButton
        waitForSeconds={5}
        onComplete={() => {
          alert("Complete event called at 5s.");
        }}
      />
      <StartStopButton
        isTurning={true}
        onComplete={() => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <StartStopButton
        waitForSeconds={5}
        onComplete={() => {
          alert("Complete event called at 4s.");
        }}
      />
      <StartStopButton
        isTurning={true}
        onComplete={() => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};
