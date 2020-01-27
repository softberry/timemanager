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

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Input name="name" value={name.firstName()}></Input>
      <Input name="Surname" value={name.lastName()}></Input>
      <Input name="City" value={address.city()}></Input>
    </StoryPage>
  );
};

export const secondary: any = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Input name="name" value={name.firstName()}></Input>
      <Input name="Surname" value={name.lastName()}></Input>
      <Input name="City" value={address.city()}></Input>
    </StoryPage>
  );
};
