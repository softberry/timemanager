import React from "react";

import Autocomplete from "../../__ui/autocomplete";

import StoryPage from "../story-page";
import { DesignEnums } from "../../__typings/interfaces.d";

export default {
  title: "Autocomplete",
  component: Autocomplete,
};

export const Primary = function() {
  return (
    <StoryPage viewType="PrimaryView">
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Autocomplete variant={DesignEnums.PRIMARY_VIEW} />
      </div>
    </StoryPage>
  );
};
export const secondary = function() {
  return (
    <StoryPage viewType="SecondaryView">
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Autocomplete variant={DesignEnums.SECONDARY_VIEW} />
      </div>
    </StoryPage>
  );
};
