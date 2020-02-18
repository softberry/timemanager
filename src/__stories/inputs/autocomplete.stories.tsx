import React from "react";

import Autocomplete from "../../__ui/autocomplete";

import StoryPage from "../story-page";

export default {
  title: "Autocomplete",
  component: Autocomplete,
};

export const Primary = function() {
  return (
    <StoryPage viewType="PrimaryView">
      <Autocomplete variant="primary" />
    </StoryPage>
  );
};
export const secondary = function() {
  return (
    <StoryPage viewType="SecondaryView">
      <Autocomplete variant="secondary" />
    </StoryPage>
  );
};
