import React, { ReactElement } from "react";

import { MultipleInput } from "../../__ui/formElements";

import StoryPage from "../story-page";
import { internet } from "faker";
import { ValidationTypeEnums } from "../../__typings/interfaces.d";
import { IInputProps } from "../../__ui/formElements/input";
import { IMultiInputCallback } from "../../__ui/formElements/multipleInput";

export default {
  title: "Form Elements/Multiple Input",
  component: MultipleInput,
  parameters: {
    componentSubtitle: "Handy status label",
  },
};
const defaultProps: IInputProps = {
  name: "Testlabel",
  label: "Test label",
  type: "text",
  required: true,
  validate: true,
  validationType: ValidationTypeEnums.MAIL,
};
const values = [internet.email(), internet.email(), internet.email()];
const valids = [false, false, false];

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <MultipleInput
        defaultProps={defaultProps}
        values={values}
        valid={valids}
        name="PhoneNumbers"
        callback={(p: IMultiInputCallback): void => {
          // do nothing
        }}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <MultipleInput
        defaultProps={defaultProps}
        values={values}
        valid={valids}
        name="PhoneNumbers"
        callback={(p: IMultiInputCallback): void => {
          // do nothing
        }}
      />
    </StoryPage>
  );
};
