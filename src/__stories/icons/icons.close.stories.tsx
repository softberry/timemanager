import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { ESizeIcon } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Close",
  parameters: {
    component: Icon,
    componentSubtitle: "Close Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={ESizeIcon.SMALL}>close</Icon>
      <Icon size={ESizeIcon.MEDIUM}>close</Icon>
      <Icon size={ESizeIcon.LARGE}>close</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={ESizeIcon.SMALL}>close</Icon>
      <Icon size={ESizeIcon.MEDIUM}>close</Icon>
      <Icon size={ESizeIcon.LARGE}>close</Icon>
    </StoryPage>
  );
};
