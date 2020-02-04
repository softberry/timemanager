import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import BaseButton from "./baseButton";
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
      <BaseButton />
      <BaseButton />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <BaseButton />
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
