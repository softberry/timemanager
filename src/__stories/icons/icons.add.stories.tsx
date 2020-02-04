import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Add",
  parameters: {
    component: Icon,
    componentSubtitle: "Add Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.ADD}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.ADD}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.ADD}</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.ADD}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.ADD}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.ADD}</Icon>
    </StoryPage>
  );
};
