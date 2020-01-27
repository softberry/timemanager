import React from "react";

import Input, { MultipleInput } from "../../__ui/formElements";
import StoryPage from "../story-page";
import { phone } from "faker";
export default {
  title: "Form Elements/Multiple Input",
  component: MultipleInput,
  parameters: {
    componentSubtitle: "Handy status label",
  },
};

export const primary = () => {
  const fields = {
    name: "Mobile",
    value: [phone.phoneNumber(), phone.phoneNumber()],
  };

  return (
    <StoryPage viewType="PrimaryView">
      <MultipleInput {...fields} />
    <Input name={"inptx"} value={"test"} />
    </StoryPage>
  );
};

export const secondary: any = () => {
  return <StoryPage viewType="SecondaryView"></StoryPage>;
};
