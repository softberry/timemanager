import React from "react";

import { random } from "faker";
import Badge from "../../__ui/badge";
import StoryPage from "../story-page";

import { VDESIGN } from "../../store/constant-enums";
export default {
  title: "Badges",
  parameters: {
    component: Badge,
    componentSubtitle: "Badges",
  },
};
const content = random.number(99);

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Badge content={content} view={VDESIGN.DESIGN_VIEW_PRIMARY} />
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Badge content={content} view={VDESIGN.DESIGN_VIEW_SECONDARY} />
    </StoryPage>
  );
};
