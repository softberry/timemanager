import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { withKnobs } from "@storybook/addon-knobs";

import { BaseButtonLink } from "./baseButton";
import { ButtonLink } from "../../__ui/buttons/button";

import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Link Buttons",
  component: ButtonLink,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Buttons as anchor links",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Router>
        <BaseButtonLink />
      </Router>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Router>
        <BaseButtonLink />
      </Router>
    </StoryPage>
  );
};

primary.story = {
  parameters: { notes: " //TODO: Add Notes for Stories" },
};
secondary.story = {
  parameters: { notes: " //TODO: Add Notes for Stories" },
};
