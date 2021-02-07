import React, { ReactElement } from "react";
import { DateTime } from "../../__ui/formElements";
import StoryPage from "../story-page";

import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import moment from "moment";
import { IDateTimeProps } from "../../__ui/formElements/dateTime";

const story = {
  title: "Form Elements/Date Time",
  component: DateTime,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: "Custom UI - Multi field date and time elements with differenece calculation.",
  },
};

const dateTimePorps: IDateTimeProps = {
  start: moment().toISOString(),
  finish: moment()["add"](16, "minute").toISOString(),
  step: number("Step", 15),
  infoCallback: action("Sending current date info to parent"),
};
export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <DateTime
        // uniqueId={uuid()}
        {...dateTimePorps}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <DateTime
        // uniqueId={uuid()}
        {...dateTimePorps}
      />
    </StoryPage>
  );
};
export { story as default };
