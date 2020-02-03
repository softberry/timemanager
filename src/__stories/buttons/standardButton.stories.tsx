import React from "react";
import { withKnobs, text, select } from "@storybook/addon-knobs";

import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";
import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconEnums,
} from "../../__typings/interfaces.d";

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
      icon={select(
        "Icons",
        [
          IconEnums.ADD,
          IconEnums.ARROW_BACK,
          IconEnums.ARROW_FORWARD,
          IconEnums.CALENDAR,
          IconEnums.CHECKBOX_ON,
          IconEnums.CHECKBOX_OFF,
          IconEnums.EDIT,
          IconEnums.PHONE,
          IconEnums.RADIO_ON,
          IconEnums.RADIO_OFF,
          IconEnums.SEARCH,
          IconEnums.SETTINGS,
          IconEnums.SMART_PHONE,
          IconEnums.TIMER,
        ],
        IconEnums.ADD
      )}
      type={select(
        "Button Types",
        [
          ButtonTypeEnums.SIMPLE,
          ButtonTypeEnums.POISITIVE,
          ButtonTypeEnums.NEGATIVE,
          ButtonTypeEnums.ERROR,
        ],
        ButtonTypeEnums.SIMPLE
      )}
      align={select(
        "Alignment",
        [
          ButtonAlignmentEnums.LEFT,
          ButtonAlignmentEnums.CENTER,
          ButtonAlignmentEnums.RIGHT,
          ButtonAlignmentEnums.STRECH,
        ],
        ButtonAlignmentEnums.CENTER
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
