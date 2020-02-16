import React from "react";

import { MultipleInput } from "../../__ui/formElements";
import StoryPage from "../story-page";
import { phone } from "faker";
import { IInputProps } from "../../__typings/interfaces";

export default {
  title: "Form Elements/Multiple Input",
  component: MultipleInput,
  parameters: {
    componentSubtitle: "Handy status label",
  },
};

const fields: IInputProps = {
  name: "Mobile",
  uniqueName: "Mobile",
  required: false,
  value: [phone.phoneNumber(), phone.phoneNumber()],
  validate: true,
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <MultipleInput {...fields} />
    </StoryPage>
  );
};

export const secondary: any = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <MultipleInput {...fields} />
    </StoryPage>
  );
};
