import React from "react";

import { lorem } from "faker";
import Card, { CardTitle, CardBody, CardFooter } from "../../__ui/card";
import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";
import { action } from "@storybook/addon-actions";

import { IconNameEnums, ButtonTypeEnums } from "../../__typings/interfaces.d";
export default {
  title: "Cards",
  parameters: {
    component: Card,
    componentSubtitle: "Cards",
  },
};

export const Primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Card>
        <CardTitle>{lorem.words(3)}</CardTitle>
        <CardBody>{lorem.paragraphs(2)}</CardBody>
        <CardFooter>
          <Button
            icon={IconNameEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
          <Button
            icon={IconNameEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconNameEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconNameEnums.ADD}
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

export const Secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Card>
        <CardTitle>
          {lorem.words(3)}
          <Button
            icon={IconNameEnums.CLOSE}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
          <Button
            icon={IconNameEnums.CLOSE}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
        </CardTitle>
        <CardBody>{lorem.paragraphs(2)}</CardBody>
        <CardFooter>
          <Button
            icon={IconNameEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          />
          <Button
            icon={IconNameEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconNameEnums.ADD}
            isDisabled={false}
            onClick={action("button-click")}
            type={ButtonTypeEnums.SIMPLE}
          >
            {lorem.words(4)}
          </Button>
          <Button
            icon={IconNameEnums.ADD}
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
