import React from "react";

import { lorem } from "faker";
import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";
import { action } from "@storybook/addon-actions";

import { VDESIGN } from "../../store/constant-enums";
import { IconEnums, ButtonTypeEnums } from "../../__typings/interfaces.d";
export default {
  title: "Cards",
  parameters: {
    component: Card,
    componentSubtitle: "Cards",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Card view={VDESIGN.DESIGN_VIEW_PRIMARY}>
        <CardTitle>{lorem.words(3)}</CardTitle>
        <CardBody>{lorem.paragraphs(2)}</CardBody>
        <CardFooter>
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
        </CardFooter>
      </Card>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Card view={VDESIGN.DESIGN_VIEW_PRIMARY}>
        <CardTitle>
          {lorem.words(3)}
          <Button
            icon={IconEnums.CLOSE}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
          <Button
            icon={IconEnums.CLOSE}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
        </CardTitle>
        <CardBody>{lorem.paragraphs(2)}</CardBody>
        <CardFooter>
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
        </CardFooter>
      </Card>
    </StoryPage>
  );
};
