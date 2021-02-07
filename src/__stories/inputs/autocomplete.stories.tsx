import { ReactElement } from "react";

import Autocomplete from "../../__ui/autocomplete";

import StoryPage from "../story-page";

const story = {
  title: "Autocomplete",
  component: Autocomplete,
};

export const Primary = (): ReactElement => {
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
        <Autocomplete />
      </div>
    </StoryPage>
  );
};
export const secondary = (): ReactElement => {
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
        <Autocomplete />
      </div>
    </StoryPage>
  );
};
export { story as default };
