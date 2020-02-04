import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import BaseButton from "./baseButton";
import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Default Buttons",
  component: Button,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Project wide buttons",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <BaseButton />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <BaseButton />
    </StoryPage>
  );
};

primary.story = {
  parameters: { notes: " //TODO: Add Notes for Stories" },
};
secondary.story = {
  parameters: { notes: " //TODO: Add Notes for Stories" },
};
