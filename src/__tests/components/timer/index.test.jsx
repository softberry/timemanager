import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter as Router, Switch, Route } from "react-router-dom";
import Timer from "../../../components/timer";

it("renders without crashing", () => {
  const div = document.createElement("div");

  const TimerTest = () => {
    return (
      <Router>
        <Timer />
      </Router>
    );
  };
  ReactDOM.render(<TimerTest />, div);
  ReactDOM.unmountComponentAtNode(div);
});

