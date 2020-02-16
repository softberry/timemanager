import React from "react";

import { lorem } from "faker";
import { H5 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines /H5",
  parameters: {
    component: H5,
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <H5>{sentence}</H5>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <H5>{sentence}</H5>
    </StoryPage>
  );
};
