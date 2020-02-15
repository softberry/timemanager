import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { withKnobs } from "@storybook/addon-knobs";
import { select, text, boolean } from "@storybook/addon-knobs";

import { ButtonLink } from "../../__ui/buttons/button";
import {
  IconEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
} from "../../__typings/interfaces.d";

import StoryPage from "../story-page";
const notes = require("./notes.md");

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
        <ButtonLink
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
          href="/"
        >
          {text("Label", "Click here!!!")}
        </ButtonLink>
      </Router>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Router>
        <ButtonLink
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
          href="/"
        >
          {text("Label", "Click here!!!")}
        </ButtonLink>
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