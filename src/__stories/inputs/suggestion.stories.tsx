import React, { FunctionComponent } from "react";
import Suggestion from "../../__ui/formElements/suggestion";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Suggestion",
  component: Suggestion,
  parameters: {
    componentSubtitle: "Suggestion drop down",
  },
};

export const Primary: FunctionComponent = function () {
  return (
    <StoryPage viewType="PrimaryView">
      <Suggestion
        name="contactSuggestion"
        label="Contact Name"
        type="contact"
        required={true}
        validate={true}
        onSelectCallback={(p): void => {
          console.log(p);
        }}
      />
    </StoryPage>
  );
};

export const Secondary: FunctionComponent = function () {
  return <StoryPage viewType="SecondaryView"></StoryPage>;
};
