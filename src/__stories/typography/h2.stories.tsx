import React from "react";

import { lorem } from "faker";
import { H2 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines / H2",
  parameters: {
    component: H2,
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <H2>{sentence}</H2>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <H2>{sentence}</H2>
    </StoryPage>
  );
};
