import { ReactElement } from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
const story = {
  title: "Icons Set / Arrows",
  parameters: {
    component: Icon,
    componentSubtitle: "Back and Forward Icons",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_FORWARD}</Icon>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.ARROW_FORWARD}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_BACK}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.ARROW_FORWARD}</Icon>
    </StoryPage>
  );
};
export { story as default };
