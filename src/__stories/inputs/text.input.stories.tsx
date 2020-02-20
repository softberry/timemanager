import React from "react";
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

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Input
        name="name"
        uniqueName="name"
        value={name.firstName()}
        required={true}
        validate={true}
      ></Input>
      <Input
        name="surname"
        uniqueName="Surname"
        value={name.lastName()}
        required={false}
        validate={true}
      ></Input>
      <Input
        name="city"
        uniqueName="City"
        value={address.city()}
        required={false}
        validate={true}
      ></Input>
    </StoryPage>
  );
};

export const secondary: any = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Input
        name="name"
        uniqueName="name"
        value={name.firstName()}
        required={true}
        validate={true}
      ></Input>
      <Input
        name="surname"
        uniqueName="Surname"
        value={name.lastName()}
        required={false}
        validate={true}
      ></Input>
      <Input
        name="city"
        uniqueName="City"
        value={address.city()}
        required={false}
        validate={true}
      ></Input>
    </StoryPage>
  );
};
