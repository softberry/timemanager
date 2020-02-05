import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { withKnobs } from "@storybook/addon-knobs";

import BaseButton, { notes } from "./baseButton";
import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Standart Buttons",
  component: Button,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Project wide buttons",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Router>
        <BaseButton />
      </Router>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Router>
        <BaseButton />
      </Router>
    </StoryPage>
  );
};

primary.story = {
  parameters: { notes },
};
secondary.story = {
  parameters: { notes },
};
