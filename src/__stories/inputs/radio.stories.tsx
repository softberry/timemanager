import React from "react";
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

const radioGroup = (({ len }) => {
  const seletcedIndex = random.number({ min: 0, max: len });
  return new Array(len).fill("").map((chk, i) => {
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
  });
})({ len: 3 });

export const primary = function() {
  return (
    <StoryPage viewType="PrimaryView">
      <RadioGroup
        onChange={(val: any) => {
          console.log("PrimaryView RadioGroup[1] value", val);
        }}
      >
        {radioGroup}
      </RadioGroup>
      <hr />
      <RadioGroup
        onChange={(val: any) => {
          console.log("PrimaryView RadioGroup[2] value", val);
        }}
      >
        {radioGroup}
      </RadioGroup>
    </StoryPage>
  );
};

export const secondary = function() {
  return (
    <StoryPage viewType="SecondaryView">
      <RadioGroup
        onChange={(val: string) => {
          console.log("SecondaryView RadioGroup[1] value", val);
        }}
      >
        {radioGroup}
      </RadioGroup>
    </StoryPage>
  );
};
