import React, { ReactElement } from "react";

import StartStopButton from "../../__ui/buttons/startStopButton";
import StoryPage from "../story-page";

const story = {
  title: "Form Elements/Buttons/Start Stop Button/Turning",
  component: StartStopButton,
  parameters: {
    componentSubtitle: "Delayed callback button",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <StartStopButton
        isTurning={true}
        onComplete={(): void => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <StartStopButton
        isTurning={true}
        onComplete={(): void => {
          alert("Complete event called at default 3s.");
        }}
      />
    </StoryPage>
  );
};
export { story as default };
