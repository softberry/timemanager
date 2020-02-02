import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";

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

const BaseButtonStory = () => (
  <>
    <Button
      icon={select("Icons", ["add", "close", "add", "edit", "save"], "add")}
      actionClass={select(
        "Button Types",
        ["simple", "error", "negative", "positive"],
        "simple"
      )}
    >
      {text("Label", "Hello Storybook")}
    </Button>
  </>
);
export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <BaseButtonStory />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <BaseButtonStory />
    </StoryPage>
  );
};

primary.story = {
  parameters: { notes: " //TODO: Add Notes for Stories" },
};
secondary.story = {
  parameters: { notes: " //TODO: Add Notes for Stories" },
};
