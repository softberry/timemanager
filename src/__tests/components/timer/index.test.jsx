import React  from "react";
import ReactDOM from 'react-dom';

import Timer from "../../../components/timer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const diff = { hour: 1, minute: 2, second: 3 };
  ReactDOM.render(<Timer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
