import React, { ReactElement } from "react";
import Input from "../../__ui/formElements";
import StoryPage from "../story-page";
import { name, address } from "faker";

export default {
  title: "Form Elements/Input",
  component: Input,
  parameters: {
    componentSubtitle: "Handy status label",
  },
};

export const Primary = (): ReactElement => {
  return (
    <StoryPage viewType="PrimaryView">
      <Input
        name="name"
        label="name"
        uniqueName="name"
        value={name.firstName()}
        required={true}
        validate={true}
      />
      <Input
        name="surname"
        label="surname"
        uniqueName="surname"
        value={name.lastName()}
        required={false}
        validate={true}
      />
      <Input
        name="city"
        label="city"
        uniqueName="city"
        value={address.city()}
        required={false}
        validate={true}
      />
    </StoryPage>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <StoryPage viewType="SecondaryView">
      <Input
        name="name"
        label="name"
        uniqueName="name"
        value={name.firstName()}
        required={true}
        validate={true}
      />
      <Input
        name="surname"
        label="surname"
        uniqueName="surname"
        value={name.lastName()}
        required={false}
        validate={true}
      />
      <Input
        name="city"
        label="city"
        uniqueName="city"
        value={address.city()}
        required={false}
        validate={true}
      />
    </StoryPage>
  );
};
