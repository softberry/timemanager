import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Check Box",
  parameters: {
    component: Icon,
    componentSubtitle: "Check Box Icon",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CHECKBOX_ON}</Icon>
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CHECKBOX_OFF}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CHECKBOX_ON}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CHECKBOX_OFF}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CHECKBOX_ON}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CHECKBOX_OFF}</Icon>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CHECKBOX_ON}</Icon>
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CHECKBOX_OFF}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CHECKBOX_ON}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CHECKBOX_OFF}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CHECKBOX_ON}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CHECKBOX_OFF}</Icon>
    </StoryPage>
  );
};
