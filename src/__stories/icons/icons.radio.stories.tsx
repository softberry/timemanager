import React from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { SizeIconEnums, IconEnums } from "../../__typings/interfaces.d";
export default {
  title: "Icons Set / Radio Group",
  parameters: {
    component: Icon,
    componentSubtitle: "Radio Icon",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.RADIO_ON}</Icon>
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.RADIO_OFF}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.RADIO_OFF}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.RADIO_ON}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.RADIO_OFF}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.RADIO_ON}</Icon>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.RADIO_ON}</Icon>
      <Icon size={SizeIconEnums.SMALL}>{IconEnums.RADIO_OFF}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.RADIO_OFF}</Icon>
      <Icon size={SizeIconEnums.MEDIUM}>{IconEnums.RADIO_ON}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.RADIO_OFF}</Icon>
      <Icon size={SizeIconEnums.LARGE}>{IconEnums.RADIO_ON}</Icon>
    </StoryPage>
  );
};
