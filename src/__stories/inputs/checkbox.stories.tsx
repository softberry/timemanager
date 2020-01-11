import React from "react";
import  Checkbox  from "../../__ui/formElements/checkbox/checkbox";
import StoryPage from "../story-page";
import { lorem, random } from "faker";

export default {
  title: "Form Elements/Checkbox",
  component: Checkbox,
  parameters: {
    componentSubtitle: "Handy status label"
  }
};

const checkBoxes = (({ len }) => {
  return new Array(len).fill("").map((chk, i) => {
    return (
      <Checkbox
        key={i}
        checked={random.boolean()}
        label={lorem.words(4)}
        onChange={onChangeHandler}
      >
        <span>{lorem.paragraph()}</span>
      </Checkbox>
    );
  });
})({ len: 3 });

function onChangeHandler(checked:boolean) {
  console.log(checked);
}
export const primary:any = function() {
  return <StoryPage viewType="PrimaryView">{checkBoxes}</StoryPage>;
};

export const secondary:any = function() {
  return <StoryPage viewType="SecondaryView">{checkBoxes}</StoryPage>;
};
