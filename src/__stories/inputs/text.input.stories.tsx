import React from "react";
import Input from "../../__ui/formElements/input/input";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Input",
  component: Input,
  parameters: {
    componentSubtitle: "Handy status label",
  }
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Input id="001" name="name" value="input Text" ></Input>
      
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Input id="004" name="name" value="input Text" />
      <Input id="005" name="Surname" value="input Text" />
      <Input id="006" name="Address" value="input Text" />
    </StoryPage>
  );
};
