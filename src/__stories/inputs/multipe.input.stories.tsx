import React, { ReactElement } from "react";

import { MultipleInput } from "../../__ui/formElements";

import StoryPage from "../story-page";
import { phone } from "faker";
import {
  ValidationTypeEnums,
  IInputProps,
  IMultiInputCallback,
} from "../../__typings/interfaces.d";

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
const values = [phone.phoneNumber(), phone.phoneNumber(), phone.phoneNumber()];
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
