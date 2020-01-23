import React from "react";

import OptionsButton from "../../__ui/buttons/optionsButton";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Options Button",
  component: OptionsButton,
  parameters: {
    componentSubtitle: "Options button",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <OptionsButton onClick={() => {}}>
        <div>
          <ul>
            <li>Line 1</li>
            <li>Line 2</li>
            <li>Line 3</li>
          </ul>
        </div>
      </OptionsButton>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <OptionsButton onClick={() => {}} />
    </StoryPage>
  );
};
