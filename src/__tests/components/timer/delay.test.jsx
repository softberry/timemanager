import React from "react";
import ReactDOM from "react-dom";

import Delay from "../../../components/timer/delay";

describe("Delay Bar ", () => {
  test("renders without crashing", () => {
    const div = document.createElement("div");
    const props = { show: true, value: 0 };
    ReactDOM.render(<Delay {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("return empty string if not shown", () => {
    const div = document.createElement("div");
    const props = { show: false, value: 0 };
    expect(ReactDOM.render(<Delay {...props} />, div)).toBe(null);
    ReactDOM.unmountComponentAtNode(div);
  });
});
