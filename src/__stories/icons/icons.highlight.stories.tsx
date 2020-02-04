import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
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
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLEAR}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CLEAR}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CLEAR}</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLEAR}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CLEAR}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CLEAR}</Icon>
    </StoryPage>
  );
};
