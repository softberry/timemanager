import React from "react";

import { lorem } from "faker";
import { H4 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines /H4",
  parameters: {
    component: H4,
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <H4>{sentence}</H4>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <H4>{sentence}</H4>
    </StoryPage>
  );
};
