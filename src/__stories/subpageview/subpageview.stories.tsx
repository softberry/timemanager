import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

// import { lorem } from "faker";

import SubPageView from "../../components/subPageView";

import StoryPage from "../story-page";

const notes = require("./notes.md");
export default {
  title: "Sub Page View",
  parameters: {
    component: SubPageView,
    componentSubtitle: "Inline layer",
  },
  decorators: [withKnobs],
};

export const Primary = () => {
  return <StoryPage></StoryPage>;
};

export const Secondary = () => {
  return <StoryPage></StoryPage>;
};

Primary.story = {
  parameters: { notes },
};
Secondary.story = {
  parameters: { notes },
};
