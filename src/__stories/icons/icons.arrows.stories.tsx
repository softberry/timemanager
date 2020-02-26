import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Arrows",
  parameters: {
    component: Icon,
    componentSubtitle: "Back and Forward Icons",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_FORWARD}</Icon>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_FORWARD}</Icon>
    </StoryPage>
  );
};
