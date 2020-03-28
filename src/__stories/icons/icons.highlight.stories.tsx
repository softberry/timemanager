import React, { ReactElement } from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Highlights",
  parameters: {
    component: Icon,
    componentSubtitle: "Clear Input box",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLEAR}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CLEAR}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CLEAR}</Icon>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLEAR}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CLEAR}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CLEAR}</Icon>
    </StoryPage>
  );
};
