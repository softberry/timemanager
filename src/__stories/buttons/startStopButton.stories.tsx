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
      <StartStopButton onComplete={() => console.log} />
      <StartStopButton isTurning={true} onComplete={action("delayed-click")} />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <StartStopButton onComplete={() => console.log} />
      <StartStopButton isTurning={true} onComplete={() => console.log} />
    </StoryPage>
  );
};
