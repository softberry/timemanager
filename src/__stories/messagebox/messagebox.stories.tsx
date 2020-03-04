import React, { ReactElement } from "react";
import { Provider, useDispatch } from "react-redux";
import { TimerAppStore } from "../../App";
import { withKnobs } from "@storybook/addon-knobs";

import { lorem } from "faker";

import Message from "../../components/message";

import StoryPage from "../story-page";

import {
  IMessageTypeEnums,
  ButtonTypeEnums,
  IconNameEnums,
  ButtonAlignmentEnums,
  IConfirmTypeEnums,
  IMessageContentProps,
} from "../../__typings/interfaces.d";
import { H1 } from "../../__ui/headline";
import Button from "../../__ui/buttons/button";

import * as notes from "./notes.md";
export default {
  title: "Message Box",
  parameters: {
    component: Message,
    componentSubtitle: "Message Box",
  },
  decorators: [withKnobs],
};

function MessageContent({ type }: IMessageContentProps): ReactElement {
  const dispatch = useDispatch();

  function show(type: IMessageTypeEnums | IConfirmTypeEnums) {
    dispatch({
      type,
      message: {
        caption: lorem.words(2),
        body: (
          <>
            <p>{lorem.sentence()}</p>
          </>
        ),
        closable: true,
      },
    });
  }

  return (
    <>
      <H1>Select a message box type</H1>
      <p>{lorem.paragraphs(2)}</p>
      <div style={{ display: "flex" }}>
        <Button
          isDisabled={false}
          onClick={() => {
            show(IMessageTypeEnums.INFO);
          }}
          type={ButtonTypeEnums.SIMPLE}
          icon={IconNameEnums.INFO}
          align={ButtonAlignmentEnums.LEFT}
        >
          INFO
        </Button>
        <Button
          isDisabled={false}
          onClick={() => {
            show(IMessageTypeEnums.ERROR);
          }}
          type={ButtonTypeEnums.ERROR}
          icon={IconNameEnums.ERROR}
          align={ButtonAlignmentEnums.LEFT}
        >
          ERROR
        </Button>
        <Button
          isDisabled={false}
          onClick={() => {
            show(IMessageTypeEnums.WARNING);
          }}
          type={ButtonTypeEnums.NEGATIVE}
          icon={IconNameEnums.WARNING}
          align={ButtonAlignmentEnums.LEFT}
        >
          WARNING
        </Button>
      </div>
    </>
  );
}

export const Primary = () => {
  return (
    <Provider store={TimerAppStore}>
      <StoryPage viewType="PrimaryView">
        <MessageContent />
        <Message />
      </StoryPage>
    </Provider>
  );
};

export const Secondary = () => {
  return (
    <Provider store={TimerAppStore}>
      <StoryPage viewType="SecondaryView">
        <MessageContent />
        <Message />
      </StoryPage>
    </Provider>
  );
};

Primary.story = {
  parameters: { notes },
};
Secondary.story = {
  parameters: { notes },
};
