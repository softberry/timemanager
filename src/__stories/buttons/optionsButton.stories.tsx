import React from "react";

import OptionsButton from "../../__ui/buttons/optionsButton";
import StoryPage from "../story-page";

export default {
  title: "Buttons/Options Button",
  component: OptionsButton,
  parameters: {
    componentSubtitle: "Options button",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <OptionsButton
        onClick={() => {
          alert("Complete event called at 5s.");
        }}
      />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <OptionsButton
        onClick={() => {
          alert("Complete event called at 5s.");
        }}
      />
    </StoryPage>
  );
};
