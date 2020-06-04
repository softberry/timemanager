import React, { FC } from "react";
import Suggestion from "../../__ui/formElements/suggestion";

import StoryPage from "../story-page";
import { PresetSuggestionEnums } from "../../__typings/interfaces.d";

export default {
  title: "Form Elements/Suggestion",
  component: Suggestion,
  parameters: {
    componentSubtitle: "Suggestion drop down",
  },
};

export const Primary: FC = function () {
  return (
    <StoryPage viewType="PrimaryView">
      <Suggestion
        name="contactSuggestion"
        label="Contact Name"
        type={[PresetSuggestionEnums.CONTACT]}
        required={true}
        validate={true}
        onSelectCallback={(p): void => {
          console.log(p);
        }}
      />
    </StoryPage>
  );
};

export const Secondary: FC = function () {
  return <StoryPage viewType="SecondaryView"></StoryPage>;
};
