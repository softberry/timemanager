/**
 * @file Basic button of available types, so this can be used to create stories.
 */
import React from "react";
import Button, { ButtonLink } from "../../__ui/buttons/button";
import { action } from "@storybook/addon-actions";
import {
  IconEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
} from "../../__typings/interfaces.d";
import { select, text, boolean } from "@storybook/addon-knobs";

const BaseButton = () => (
  <>
    <Button
      icon={select("Icons", Object.values(IconEnums), IconEnums.ADD)}
      type={select(
        "Button Types",
        Object.values(ButtonTypeEnums),
        ButtonTypeEnums.SIMPLE
      )}
      align={select(
        "Alignment",
        Object.values(ButtonAlignmentEnums),
        ButtonAlignmentEnums.CENTER
      )}
      isDisabled={Boolean(boolean("Disabled", false))}
      onClick={action("button-click")}
    >
      {text("Label", "Click here!!!")}
    </Button>
  </>
);
const BaseButtonLink = () => (
  <>
    <ButtonLink
      icon={select("Icons", Object.values(IconEnums), IconEnums.ADD)}
      type={select(
        "Button Types",
        Object.values(ButtonTypeEnums),
        ButtonTypeEnums.SIMPLE
      )}
      align={select(
        "Alignment",
        Object.values(ButtonAlignmentEnums),
        ButtonAlignmentEnums.CENTER
      )}
      isDisabled={Boolean(boolean("Disabled", false))}
      href="/"
    >
      {text("Label", "Click here!!!")}
    </ButtonLink>
  </>
);

export { BaseButton as default, BaseButtonLink };
