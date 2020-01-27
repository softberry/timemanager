import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { ESizeIcon } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Arrows",
  parameters: {
    component: Icon,
    componentSubtitle: "Back and Forward Icons",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={ESizeIcon.SMALL}>arrow_back</Icon>
      <Icon size={ESizeIcon.SMALL}>arrow_forward</Icon>
      <Icon size={ESizeIcon.MEDIUM}>arrow_back</Icon>
      <Icon size={ESizeIcon.MEDIUM}>arrow_forward</Icon>
      <Icon size={ESizeIcon.LARGE}>arrow_back</Icon>
      <Icon size={ESizeIcon.LARGE}>arrow_forward</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={ESizeIcon.SMALL}>arrow_back</Icon>
      <Icon size={ESizeIcon.SMALL}>arrow_forward</Icon>
      <Icon size={ESizeIcon.MEDIUM}>arrow_back</Icon>
      <Icon size={ESizeIcon.MEDIUM}>arrow_forward</Icon>
      <Icon size={ESizeIcon.LARGE}>arrow_back</Icon>
      <Icon size={ESizeIcon.LARGE}>arrow_forward</Icon>
    </StoryPage>
  );
};
