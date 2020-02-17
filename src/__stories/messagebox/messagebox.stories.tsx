import React from "react";
import { Provider, useDispatch } from "react-redux";
import { TimerAppStore } from "../../App";
import { withKnobs, radios } from "@storybook/addon-knobs";

import { lorem } from "faker";

import Message from "../../__ui/message";
import StoryPage from "../story-page";

//import { MESSAGES } from "../../store/action-types";
import { IMessageTypeEnums } from "../../__typings/interfaces.d";

//import { action } from "@storybook/addon-actions";

//import { VDESIGN } from "../../store/constant-enums";
//import { IconEnums, ButtonTypeEnums } from "../../__typings/interfaces";
export default {
  title: "Message Box",
  parameters: {
    component: Message,
    componentSubtitle: "Message Box",
  },
  decorators: [withKnobs],
};

/*
    case IMessageTypeEnums.MESSAGES_INFO:
    case IMessageTypeEnums.MESSAGES_WARNING:
    case IMessageTypeEnums.MESSAGES_ERROR:
*/
interface IMessageContentProps {
  type: IMessageTypeEnums;
}
const MessageContent: any = ({ type }: IMessageContentProps) => {
  const dispatch = useDispatch();
  console.log(type);
  function show(type: IMessageTypeEnums) {
    dispatch({
      type,
      caption: "Want to delete?",
      body: <><p>{lorem.sentence}</p></>,
      closable: true,
    });
  }
  show(type);
  return <>Select a message box type</>;
};

// const label = 'Fruits';
// const options = {
//   Kiwi: 'kiwi',
//   Guava: 'guava',
//   Watermelon: 'watermelon',
// };
// const defaultValue = 'kiwi';
// const groupId = 'GROUP-ID1';

// const value = radios(label, options, defaultValue, groupId);

export const Primary = () => {
  return (
    <Provider store={TimerAppStore}>
      <StoryPage viewType="PrimaryView">
        <MessageContent
          type={radios(
            "Message Box Types",
            {
              Info: IMessageTypeEnums.INFO,
              Error: IMessageTypeEnums.ERROR,
              Warning: IMessageTypeEnums.WARNING,
            },
            null,
            "GROUP-ID1"
          )}
        />
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
