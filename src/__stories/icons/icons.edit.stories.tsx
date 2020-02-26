import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Edit",
  parameters: {
    component: Icon,
    componentSubtitle: "Edit Icon",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.EDIT}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.EDIT}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.EDIT}</Icon>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.EDIT}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.EDIT}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.EDIT}</Icon>
    </StoryPage>
  );
};
