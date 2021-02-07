import { ReactElement } from "react";

import Icon from "../../__ui/icon";
import StoryPage from "../story-page";

import { IconSizeEnums, IconNameEnums } from "../../__typings/interfaces.d";
const story = {
  title: "Icons Set / Close",
  parameters: {
    component: Icon,
    componentSubtitle: "Close Icon",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLOSE}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CLOSE}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CLOSE}</Icon>
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.CLOSE}</Icon>
      <Icon size={IconSizeEnums.MEDIUM}>{IconNameEnums.CLOSE}</Icon>
      <Icon size={IconSizeEnums.LARGE}>{IconNameEnums.CLOSE}</Icon>
    </StoryPage>
  );
};

export { story as default };
