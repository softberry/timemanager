import React, { ReactElement } from "react";
import { Provider, useDispatch } from "react-redux";
import { TimerAppStore } from "../../App";
import { withKnobs } from "@storybook/addon-knobs";

import { lorem } from "faker";

import Message from "../../components/message";

import StoryPage from "../story-page";

import {
  ButtonTypeEnums,
  IconNameEnums,
  ButtonAlignmentEnums,
  IMessageContentProps,
  DialogTypes,
  IDialogActionEnums,
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

  function show(type: IDialogActionEnums, dialogType: DialogTypes): void {
    dispatch({
      type,
      message: {
        dialogType,
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
          onClick={(): void => {
            show(IDialogActionEnums.OPEN, DialogTypes.INFO);
          }}
          type={ButtonTypeEnums.SIMPLE}
          icon={IconNameEnums.INFO}
          align={ButtonAlignmentEnums.LEFT}
        >
          INFO
        </Button>
        <Button
          isDisabled={false}
          onClick={(): void => {
            show(IDialogActionEnums.OPEN, DialogTypes.ERROR);
          }}
          type={ButtonTypeEnums.ERROR}
          icon={IconNameEnums.ERROR}
          align={ButtonAlignmentEnums.LEFT}
        >
          ERROR
        </Button>
        <Button
          isDisabled={false}
          onClick={(): void => {
            show(IDialogActionEnums.OPEN, DialogTypes.WARNING);
          }}
          type={ButtonTypeEnums.NEGATIVE}
          icon={IconNameEnums.WARNING}
          align={ButtonAlignmentEnums.LEFT}
        >
          WARNING
        </Button>
        <Button
          isDisabled={false}
          onClick={(): void => {
            show(IDialogActionEnums.OPEN, DialogTypes.CONFIRM);
          }}
          type={ButtonTypeEnums.NEGATIVE}
          icon={IconNameEnums.CONFIRM}
          align={ButtonAlignmentEnums.LEFT}
        >
          CONFIRM
        </Button>
      </div>
    </>
  );
}

export const Primary = (): ReactElement => {
  return (
    <Provider store={TimerAppStore}>
      <StoryPage viewType="PrimaryView">
        <MessageContent />
        <Message />
      </StoryPage>
    </Provider>
  );
};

export const Secondary = (): ReactElement => {
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
