import React from "react"
import { ButtonLink } from "../../__ui/buttons/button";
import { IconEnums, ButtonTypeEnums, ButtonAlignmentEnums } from "../../__typings/interfaces.d";
import { select, text } from "@storybook/addon-knobs";

const BaseButton = () => (
  <>
    <ButtonLink
      icon={select(
        "Icons",
        [
          IconEnums.ADD,
          IconEnums.ARROW_BACK,
          IconEnums.ARROW_FORWARD,
          IconEnums.BLANK,
          IconEnums.CALENDAR,
          IconEnums.CHECK_CIRCLE,
          IconEnums.CHECKBOX_ON,
          IconEnums.CHECKBOX_OFF,
          IconEnums.EDIT,
          IconEnums.PHONE,
          IconEnums.RADIO_ON,
          IconEnums.RADIO_OFF,
          IconEnums.SEARCH,
          IconEnums.SETTINGS,
          IconEnums.SMART_PHONE,
          IconEnums.TIMER,
        ],
        IconEnums.ADD
      )}
      type={select(
        "Button Types",
        [
          ButtonTypeEnums.SIMPLE,
          ButtonTypeEnums.POISITIVE,
          ButtonTypeEnums.NEGATIVE,
          ButtonTypeEnums.ERROR,
        ],
        ButtonTypeEnums.SIMPLE
      )}
      align={select(
        "Alignment",
        [
          ButtonAlignmentEnums.LEFT,
          ButtonAlignmentEnums.CENTER,
          ButtonAlignmentEnums.RIGHT,
          ButtonAlignmentEnums.STRECH,
          ButtonAlignmentEnums.INLINE,
        ],
        ButtonAlignmentEnums.CENTER
      )}
      href=""
    >
      {text("Label", "Click here!!!")}
    </ButtonLink>
  </>
);

export default BaseButton;
