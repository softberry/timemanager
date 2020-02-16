import React from "react";
import ReactDOM from "react-dom";

import Counter from "../../../components/timer/counter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const diff = { hour: 1, minute: 2, second: 3 };
  ReactDOM.render(<Counter {...diff} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
