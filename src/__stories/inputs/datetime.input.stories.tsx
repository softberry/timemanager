import React from "react";
import { DateTime } from "../../__ui/formElements";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Date Time",
  component: DateTime,
  parameters: {
    componentSubtitle: "Handy status label",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <DateTime />
    </StoryPage>
  );
};

export const secondary: any = () => {
  return <StoryPage viewType="SecondaryView"></StoryPage>;
};
