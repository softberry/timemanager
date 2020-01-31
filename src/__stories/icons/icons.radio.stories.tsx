import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { ESizeIcon } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Radio Group",
  parameters: {
    component: Icon,
    componentSubtitle: "Radio Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={ESizeIcon.SMALL}>radio_button_unchecked</Icon>
      <Icon size={ESizeIcon.SMALL}>radio_button_checked</Icon>
      <Icon size={ESizeIcon.MEDIUM}>radio_button_unchecked</Icon>
      <Icon size={ESizeIcon.MEDIUM}>radio_button_checked</Icon>
      <Icon size={ESizeIcon.LARGE}>radio_button_unchecked</Icon>
      <Icon size={ESizeIcon.LARGE}>radio_button_checked</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={ESizeIcon.SMALL}>radio_button_unchecked</Icon>
      <Icon size={ESizeIcon.SMALL}>radio_button_checked</Icon>
      <Icon size={ESizeIcon.MEDIUM}>radio_button_unchecked</Icon>
      <Icon size={ESizeIcon.MEDIUM}>radio_button_checked</Icon>
      <Icon size={ESizeIcon.LARGE}>radio_button_unchecked</Icon>
      <Icon size={ESizeIcon.LARGE}>radio_button_checked</Icon>
    </StoryPage>
  );
};
