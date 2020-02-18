import React from "react";

// import BaseButton, { notes } from "./baseButton";
import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";
import { action } from "@storybook/addon-actions";

import {
  IconEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
} from "../../__typings/interfaces.d";
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs";

const notes = require("./notes.md");
export default {
  title: "Form Elements/Buttons/Standart Buttons",
  component: Button,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Project wide buttons",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Button
        icon={select("Icons", Object.values(IconEnums), IconEnums.ADD)}
        type={select(
          "Button Types",
          Object.values(ButtonTypeEnums),
          ButtonTypeEnums.SIMPLE
        )}
        align={select(
          "Alignment",
          Object.values(ButtonAlignmentEnums),
          ButtonAlignmentEnums.CENTER
        )}
        isDisabled={Boolean(boolean("Disabled", false))}
        onClick={action("button-click")}
      >
        {text("Label", "Click here!!!")}
      </Button>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Button
        icon={select("Icons", Object.values(IconEnums), IconEnums.ADD)}
        type={select(
          "Button Types",
          Object.values(ButtonTypeEnums),
          ButtonTypeEnums.SIMPLE
        )}
        align={select(
          "Alignment",
          Object.values(ButtonAlignmentEnums),
          ButtonAlignmentEnums.CENTER
        )}
        isDisabled={Boolean(boolean("Disabled", false))}
        onClick={action("button-click")}
      >
        {text("Label", "Click here!!!")}
      </Button>
    </StoryPage>
  );
};

Primary.story = {
  parameters: { notes },
};
Secondary.story = {
  parameters: { notes },
};
