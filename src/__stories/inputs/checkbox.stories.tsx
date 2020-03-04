import React, { ReactElement } from "react";
import Checkbox from "../../__ui/formElements/checkbox/checkbox";
import StoryPage from "../story-page";
import { lorem, random } from "faker";

export default {
  title: "Form Elements/Checkbox",
  component: Checkbox,
};

const checkBoxes = new Array(3).fill("").map((chk: string, i: number) => {
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

function onChangeHandler(checked: boolean): void {
  console.log(checked);
}
export const Primary = (): ReactElement => {
  return <StoryPage viewType="PrimaryView">{checkBoxes}</StoryPage>;
};

export const secondary = (): ReactElement => {
  return <StoryPage viewType="SecondaryView">{checkBoxes}</StoryPage>;
};
