import React from "react";

import StartStopButton from "../../__ui/buttons/startStopButton";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Start Stop Button/Turning",
  component: StartStopButton,
  parameters: {
    componentSubtitle: "Delayed callback button",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <StartStopButton
        isTurning={true}
        onComplete={() => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <StartStopButton
        isTurning={true}
        onComplete={() => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};
