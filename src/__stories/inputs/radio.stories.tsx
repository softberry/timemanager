import React from "react";
import { RadioGroup, Radio } from "../../__ui/formElements";
import StoryPage from "../story-page";
import { lorem, random } from "faker";

export default {
  title: "RadioGroup",
  component: RadioGroup,
  parameters: {
    componentSubtitle: "Custom Radio group component"
  }
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
