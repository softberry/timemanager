import React, { ReactElement } from "react";
import Input from "../../__ui/formElements";
import StoryPage from "../story-page";
import { name, address } from "faker";
import { ValidationTypeEnums } from "../../__typings/interfaces.d";

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
        type="text"
        value={name.firstName()}
        required={true}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
      />
      <Input
        name="surname"
        label="surname"
        type="text"
        value={name.lastName()}
        required={false}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
      />
      <Input
        name="city"
        label="city"
        type="text"
        value={address.city()}
        required={false}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
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
        type="text"
        value={name.firstName()}
        required={true}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
      />
      <Input
        name="surname"
        label="surname"
        type="text"
        value={name.lastName()}
        required={false}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
      />
      <Input
        name="city"
        label="city"
        type="text"
        value={address.city()}
        required={false}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
      />
    </StoryPage>
  );
};
