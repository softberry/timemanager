import { ReactElement } from "react";
import { Provider, useDispatch } from "react-redux";
import { TimerAppStore } from "../../App";

import { withKnobs } from "@storybook/addon-knobs";
import { SubPageActionEnums, ButtonTypeEnums, IconNameEnums, ButtonAlignmentEnums } from "../../__typings/interfaces.d";

import { lorem } from "faker";

import SubPageView from "../../components/subPageView";

import StoryPage from "../story-page";
import Button from "../../__ui/buttons/button";

import * as notes from "./notes.md";

const story = {
  title: "Sub Page View",
  parameters: {
    component: SubPageView,
    componentSubtitle: "Inline layer",
  },
  decorators: [withKnobs],
};

function SubPageStorySample(): ReactElement {
  const dispatch = useDispatch();
  const showSubPage = (): void => {
    dispatch({
      type: SubPageActionEnums.SHOW,
      action: {
        caption: "Subpage Story",
        content: (
          <>
            <p>{lorem.paragraphs(5)}</p>
            <p>{lorem.paragraphs(5)}</p>
            <p>{lorem.paragraphs(5)}</p>
          </>
        ),
      },
    });
  };

  return (
    <div>
      <p style={{ textAlign: "center" }}>Show a Sub Page View with some dummy content</p>
      <Button
        isDisabled={false}
        onClick={showSubPage}
        type={ButtonTypeEnums.POSITIVE}
        icon={IconNameEnums.ARROW_FORWARD}
        align={ButtonAlignmentEnums.CENTER}
      ></Button>
    </div>
  );
}
export const Primary = (): ReactElement => {
  return (
    <Provider store={TimerAppStore}>
      <StoryPage viewType="PrimaryView">
        <SubPageStorySample />
        <SubPageView />
      </StoryPage>
    </Provider>
  );
};

export const Secondary = (): ReactElement => {
  return (
    <Provider store={TimerAppStore}>
      <StoryPage viewType="SecondaryView">
        <SubPageStorySample />
        <SubPageView />
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

export { story as default };
