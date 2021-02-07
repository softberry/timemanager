import { ReactElement } from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { withKnobs } from "@storybook/addon-knobs";
import { select, text, boolean } from "@storybook/addon-knobs";

import { ButtonLink } from "../../__ui/buttons/button";
import { IconNameEnums, ButtonTypeEnums, ButtonAlignmentEnums } from "../../__typings/interfaces.d";

import StoryPage from "../story-page";
import * as notes from "./notes.md";

const story = {
  title: "Form Elements/Buttons/Link Buttons",
  component: ButtonLink,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Buttons as anchor links",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Router>
        <ButtonLink
          icon={select("Icons", Object.values(IconNameEnums), IconNameEnums.ADD)}
          type={select("Button Types", Object.values(ButtonTypeEnums), ButtonTypeEnums.SIMPLE)}
          align={select("Alignment", Object.values(ButtonAlignmentEnums), ButtonAlignmentEnums.CENTER)}
          isDisabled={Boolean(boolean("Disabled", false))}
          href="/"
        >
          {text("Label", "Click here!!!")}
        </ButtonLink>
      </Router>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Router>
        <ButtonLink
          icon={select("Icons", Object.values(IconNameEnums), IconNameEnums.ADD)}
          type={select("Button Types", Object.values(ButtonTypeEnums), ButtonTypeEnums.SIMPLE)}
          align={select("Alignment", Object.values(ButtonAlignmentEnums), ButtonAlignmentEnums.CENTER)}
          isDisabled={Boolean(boolean("Disabled", false))}
          href="/"
        >
          {text("Label", "Click here!!!")}
        </ButtonLink>
      </Router>
    </StoryPage>
  );
};

Primary.story = {
  parameters: { notes },
};
Secondary.story = {
  parameters: { notes },
};
export { story as default };
