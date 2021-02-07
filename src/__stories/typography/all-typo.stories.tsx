import { ReactElement } from "react";

import { lorem } from "faker";
import HeadLine, { H1, H2, H3, H4, H5, H6 } from "../../__ui/headline";
import StoryPage from "../story-page";

const story = {
  title: "Typographie / Headlines",
  parameters: {
    component: HeadLine,
    subcomponents: { H1, H2, H3, H4, H5, H6 },
    componentSubtitle: "Headline",
  },
};
const sentence = lorem.sentence(5);

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <H1>{sentence}</H1>
      <H2>{sentence}</H2>
      <H3>{sentence}</H3>
      <H4>{sentence}</H4>
      <H5>{sentence}</H5>
      <H6>{sentence}</H6>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <H1>{sentence}</H1>
      <H2>{sentence}</H2>
      <H3>{sentence}</H3>
      <H4>{sentence}</H4>
      <H5>{sentence}</H5>
      <H6>{sentence}</H6>
    </StoryPage>
  );
};

export { story as default };
