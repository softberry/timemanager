import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Close",
  parameters: {
    component: Icon,
    componentSubtitle: "Close Icon",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLOSE}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CLOSE}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CLOSE}</Icon>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.CLOSE}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.CLOSE}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.CLOSE}</Icon>
    </StoryPage>
  );
};
