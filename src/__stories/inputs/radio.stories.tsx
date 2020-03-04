import React, { ReactElement } from "react";
import RadioGroup from "../../__ui/formElements/radiogroup/radio-group";
import Radio from "../../__ui/formElements/radiogroup/radio";
import StoryPage from "../story-page";
import { lorem, random } from "faker";

export default {
  title: "Form Elements/Radio Group",
  component: RadioGroup,
  parameters: {
    componentSubtitle: "Custom Radio group component",
  },
};

const radioGroup = (({ len }): ReactElement[] => {
  const seletcedIndex = random.number({ min: 0, max: len });
  return new Array(len).fill("").map(
    (chk: string, i: number): ReactElement => {
      return (
        <Radio
          key={i}
          checked={i === seletcedIndex}
          label={lorem.words(4)}
          value={`ABC-${i}`}
        >
          <span>{lorem.paragraph()}</span>
        </Radio>
      );
    }
  );
})({ len: 3 });

export const Primary = function(): ReactElement {
  return (
    <StoryPage viewType="PrimaryView">
      <RadioGroup
        onChange={(val: string): void => {
          console.log("PrimaryView RadioGroup[1] value", val);
        }}
      >
        {radioGroup}
      </RadioGroup>
      <hr />
      <RadioGroup
        onChange={(val: string): void => {
          console.log("PrimaryView RadioGroup[2] value", val);
        }}
      >
        {radioGroup}
      </RadioGroup>
    </StoryPage>
  );
};

export const Secondary = function(): ReactElement {
  return (
    <StoryPage viewType="SecondaryView">
      <RadioGroup
        onChange={(val: string): void => {
          console.log("SecondaryView RadioGroup[1] value", val);
        }}
      >
        {radioGroup}
      </RadioGroup>
    </StoryPage>
  );
};
