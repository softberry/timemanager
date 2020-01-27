import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { ESizeIcon } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Highlights",
  parameters: {
    component: Icon,
    componentSubtitle: "Clear Input box",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={ESizeIcon.SMALL}>highlight_off</Icon>
      <Icon size={ESizeIcon.MEDIUM}>highlight_off</Icon>
      <Icon size={ESizeIcon.LARGE}>highlight_off</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={ESizeIcon.SMALL}>highlight_off</Icon>
      <Icon size={ESizeIcon.MEDIUM}>highlight_off</Icon>
      <Icon size={ESizeIcon.LARGE}>highlight_off</Icon>
    </StoryPage>
  );
};
