import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Add",
  parameters: {
    component: Icon,
    componentSubtitle: "Add Icon",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ADD}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ADD}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ADD}</Icon>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ADD}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ADD}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ADD}</Icon>
    </StoryPage>
  );
};
