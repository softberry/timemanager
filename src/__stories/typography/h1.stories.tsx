import React from "react";

import { lorem } from "faker";
import { H1 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines  / H1",
  parameters: {
    component: H1,
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <H1>{sentence}</H1>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <H1>{sentence}</H1>
    </StoryPage>
  );
};
