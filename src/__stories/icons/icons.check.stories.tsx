import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { ESizeIcon } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Check Box",
  parameters: {
    component: Icon,
    componentSubtitle: "Check Box Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={ESizeIcon.SMALL}>check_box_outline_blank</Icon>
      <Icon size={ESizeIcon.SMALL}>check_box</Icon>
      <Icon size={ESizeIcon.MEDIUM}>check_box_outline_blank</Icon>
      <Icon size={ESizeIcon.MEDIUM}>check_box</Icon>
      <Icon size={ESizeIcon.LARGE}>check_box_outline_blank</Icon>
      <Icon size={ESizeIcon.LARGE}>check_box</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={ESizeIcon.SMALL}>check_box_outline_blank</Icon>
      <Icon size={ESizeIcon.SMALL}>check_box</Icon>
      <Icon size={ESizeIcon.MEDIUM}>check_box_outline_blank</Icon>
      <Icon size={ESizeIcon.MEDIUM}>check_box</Icon>
      <Icon size={ESizeIcon.LARGE}>check_box_outline_blank</Icon>
      <Icon size={ESizeIcon.LARGE}>check_box</Icon>
    </StoryPage>
  );
};
