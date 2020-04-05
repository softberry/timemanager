import React, { ReactElement } from "react";
import { DateTime } from "../../__ui/formElements";
import StoryPage from "../story-page";

import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
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
        // uniqueId={uuid()}
        start={moment().toISOString()}
        finish={moment().add(16, "minute").toISOString()}
        step={number("Step", 15)}
        infoCallback={action("Sending current date info to parent")}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <DateTime
        // uniqueId={uuid()}
        start={moment().toISOString()}
        finish={moment().add(16, "minute").toISOString()}
        step={number("Step", 15)}
        infoCallback={action("Sending current date info to parent")}
      />
    </StoryPage>
  );
};
