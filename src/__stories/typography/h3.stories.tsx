import React, { ReactElement } from "react";

import { lorem } from "faker";
import { H3 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines /H3",
  parameters: {
    component: H3,
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <H3>{sentence}</H3>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <H3>{sentence}</H3>
    </StoryPage>
  );
};
