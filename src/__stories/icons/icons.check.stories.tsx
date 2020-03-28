import React, { ReactElement } from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Check Box",
  parameters: {
    component: Icon,
    componentSubtitle: "Check Box Icon",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_ON}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_OFF}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CHECKBOX_ON}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CHECKBOX_OFF}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CHECKBOX_ON}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CHECKBOX_OFF}</Icon>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_ON}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CHECKBOX_OFF}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CHECKBOX_ON}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CHECKBOX_OFF}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CHECKBOX_ON}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CHECKBOX_OFF}</Icon>
    </StoryPage>
  );
};
