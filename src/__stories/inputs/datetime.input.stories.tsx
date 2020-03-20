import React, { ReactElement } from "react";
import { DateTime } from "../../__ui/formElements";
import StoryPage from "../story-page";
import { CollapsedState } from "../../__typings/interfaces.d";
import { action } from "@storybook/addon-actions";
import { withKnobs, number, radios } from "@storybook/addon-knobs";
import moment from "moment";

export default {
  title: "Form Elements/Date Time",
  component: DateTime,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Custom UI - Multi field date and time elements with differenece calculation.",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <DateTime
        start={moment()}
        finish={moment().add(16, "minute")}
        step={number("Step", 15)}
        infoCallback={action("Sending current date info to parent")}
        collapsed={radios("Collapsed", CollapsedState, CollapsedState.COLLAPSED)}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <DateTime
        start={moment()}
        finish={moment().add(16, "minute")}
        step={number("Step", 15)}
        infoCallback={action("Sending current date info to parent")}
        collapsed={radios("Collapsed", CollapsedState, CollapsedState.COLLAPSED)}
      />
    </StoryPage>
  );
};
