import React, { ReactElement } from "react";

import { lorem } from "faker";
import { H6 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines / H6",
  parameters: {
    component: H6,
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <H6>{sentence}</H6>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <H6>{sentence}</H6>
    </StoryPage>
  );
};
