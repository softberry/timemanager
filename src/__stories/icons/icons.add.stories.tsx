import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { ESizeIcon } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Add",
  parameters: {
    component: Icon,
    componentSubtitle: "Add Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={ESizeIcon.SMALL}>add</Icon>
      <Icon size={ESizeIcon.MEDIUM}>add</Icon>
      <Icon size={ESizeIcon.LARGE}>add</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={ESizeIcon.SMALL}>add</Icon>
      <Icon size={ESizeIcon.MEDIUM}>add</Icon>
      <Icon size={ESizeIcon.LARGE}>add</Icon>
    </StoryPage>
  );
};
