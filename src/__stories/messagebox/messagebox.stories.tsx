import React from "react";

import { lorem } from "faker";

import Message from "../../__ui/message";
import StoryPage from "../story-page";

//import { action } from "@storybook/addon-actions";

//import { VDESIGN } from "../../store/constant-enums";
//import { IconEnums, ButtonTypeEnums } from "../../__typings/interfaces";
export default {
  title: "Message Box",
  parameters: {
    component: Message,
    componentSubtitle: "Message Box",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <p>{lorem.paragraphs(5)}</p>
    </StoryPage>
  );
};

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <p>{lorem.paragraphs(5)}</p>
    </StoryPage>
  );
};
