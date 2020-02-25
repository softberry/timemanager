import React from "react";
import { DateTime } from "../../__ui/formElements";
import StoryPage from "../story-page";
import { IDateTimeProps, DateTimeValue } from "../../__typings/interfaces.d";
import moment from "moment";

export default {
  title: "Form Elements/Date Time",
  component: DateTime,
  parameters: {
    componentSubtitle:
      "Custom UI - Multi field date and time elements with differenece calculation.",
  },
};
const props: IDateTimeProps = {
  start: moment(),
  finish: moment().add(16, "minute"),
  step: 15,
  infoCallback: ({ start, finish }: DateTimeValue) => {
    console.log(start, finish);
  },
};
export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <DateTime {...props} />
    </StoryPage>
  );
};

export const secondary: any = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <DateTime {...props} />
    </StoryPage>
  );
};
