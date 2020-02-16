import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
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
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.ARROW_BACK}</Icon>
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.ARROW_FORWARD}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.ARROW_BACK}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.ARROW_FORWARD}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.ARROW_BACK}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.ARROW_FORWARD}</Icon>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.ARROW_BACK}</Icon>
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.ARROW_FORWARD}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.ARROW_BACK}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.ARROW_FORWARD}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.ARROW_BACK}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.ARROW_FORWARD}</Icon>
    </StoryPage>
  );
};
