import React from "react";

import { lorem } from "faker";
import { H1, H2, H3, H4, H5, H6 } from "../../__ui/headline";
import StoryPage from "../story-page";

export default {
  title: "Typographie /Headlines /All (h1- h6)",
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
      <H2>{sentence}</H2>
      <H3>{sentence}</H3>
      <H4>{sentence}</H4>
      <H5>{sentence}</H5>
      <H6>{sentence}</H6>
    </StoryPage>
  );
};

export const Secondary = () => {
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
