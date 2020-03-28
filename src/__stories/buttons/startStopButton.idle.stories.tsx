import React, { ReactElement } from "react";

import StartStopButton from "../../__ui/buttons/startStopButton";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Start Stop Button/Idle",
  component: StartStopButton,
  parameters: {
    componentSubtitle: "Delayed callback button",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <StartStopButton
        waitForSeconds={5}
        onComplete={(): void => {
          alert("Complete event called at 5s.");
        }}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <StartStopButton
        onComplete={(): void => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};
