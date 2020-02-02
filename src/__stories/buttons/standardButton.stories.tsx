import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";

import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";
import { EButtonActionClasses } from "../../__typings/interfaces";

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
        [
          EButtonActionClasses.SIMPLE,
          EButtonActionClasses.POISITIVE,
          EButtonActionClasses.NEGATIVE,
          EButtonActionClasses.ERROR,
        ],
        EButtonActionClasses.SIMPLE
      )}
      onClick={() => false}
    >
      {text("Label", "Click here!!!")}
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
