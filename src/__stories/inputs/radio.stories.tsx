import React, { ReactElement } from "react";
import { RadioGroup, RadioItem } from "../../__ui/formElements/radiogroup";

import StoryPage from "../story-page";
import { lorem } from "faker";

export const story = {
  title: "Form Elements/Radio Group",
  component: RadioGroup,
  subcomponents: { RadioItem },
  parameters: {
    componentSubtitle: "Custom Radio group component",
  },
};

export const Primary = function (): ReactElement {
  return (
    <StoryPage viewType="PrimaryView">
      <RadioGroup
        onChange={(val: string | number): void => {
          console.log("PrimaryView RadioGroup[1] value", val);
        }}
      >
        <RadioItem checked={true} label={lorem.words(4)} value={`ABC-1`}>
          <span>{lorem.paragraph()}</span>
        </RadioItem>
        <RadioItem label={lorem.words(4)} value={`ABC-2`}>
          <span>{lorem.paragraph()}</span>
        </RadioItem>
        <RadioItem label={lorem.words(4)} value={`ABC-3`}>
          <span>{lorem.paragraph()}</span>
        </RadioItem>
      </RadioGroup>
      <hr />
    </StoryPage>
  );
};

export const Secondary = function (): ReactElement {
  return (
    <StoryPage viewType="SecondaryView">
      <RadioGroup
        onChange={(val: string | number): void => {
          console.log("SecondaryView RadioGroup[1] value", val);
        }}
      >
        <RadioItem checked={true} label={lorem.words(4)} value={`ABC-1`}>
          <span>{lorem.paragraph()}</span>
        </RadioItem>
        <RadioItem label={lorem.words(4)} value={`ABC-2`}>
          <span>{lorem.paragraph()}</span>
        </RadioItem>
        <RadioItem label={lorem.words(4)} value={`ABC-3`}>
          <span>{lorem.paragraph()}</span>
        </RadioItem>
      </RadioGroup>
    </StoryPage>
  );
};
export { story as default };
