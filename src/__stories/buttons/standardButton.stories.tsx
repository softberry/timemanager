import React from "react";

import Button from "../../__ui/buttons/button";
import StoryPage from "../story-page";

export default {
  title: "Form Elements/Buttons/Default Buttons",
  component: Button,
  parameters: {
    componentSubtitle: "Project wide buttons",
  },
};

export const primary = () => {
  return (
    <StoryPage viewType="PrimaryView">
      <Button icon="add" variant="primary">
        Click Here!
      </Button>
      <Button icon="add" variant="primary">
        Click Here!
      </Button>
    </StoryPage>
  );
};

export const secondary = () => {
  return (
    <StoryPage viewType="SecondaryView">
      <Button icon="add" variant="secondary">
        Click Here!
      </Button>
    </StoryPage>
  );
};
