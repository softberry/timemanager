import React, { ReactElement } from "react";

import { random } from "faker";
import Badge from "../../__ui/badge";
import StoryPage from "../story-page";
import { ViewEnums } from "../../__typings/interfaces.d";

export default {
  title: "Badges",
  parameters: {
    component: Badge,
    componentSubtitle: "Badges",
  },
};
const content = random.number(99);

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Badge content={content} view={ViewEnums.PRIMARY_VIEW} />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Badge content={content} view={ViewEnums.SECONDARY_VIEW} />
    </StoryPage>
  );
};
