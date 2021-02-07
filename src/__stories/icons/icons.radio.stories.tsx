import { ReactElement } from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
export const story = {
  title: "Icons Set / Radio Group",
  parameters: {
    component: Icon,
    componentSubtitle: "Radio Icon",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.RADIO_ON}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.RADIO_OFF}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.RADIO_OFF}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.RADIO_ON}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.RADIO_OFF}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.RADIO_ON}</Icon>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.RADIO_ON}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.RADIO_OFF}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.RADIO_OFF}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.RADIO_ON}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.RADIO_OFF}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.RADIO_ON}</Icon>
    </StoryPage>
  );
};
export { story as default };
