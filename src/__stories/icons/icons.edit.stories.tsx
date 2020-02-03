import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Edit",
  parameters: {
    component: Icon,
    componentSubtitle: "Edit Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.EDIT}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.EDIT}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.EDIT}</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.EDIT}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.EDIT}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.EDIT}</Icon>
    </StoryPage>
  );
};
