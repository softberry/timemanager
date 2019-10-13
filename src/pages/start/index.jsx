import React from "react";
import { withRouter } from "react-router-dom";

import StartStopButton from "../../components/startStopButton";

function Start({ history }) {
  return (
    <StartStopButton
      waitForSeconds={3}
      onComplete={() => {
        history.push("/timer");
      }}
    />
  );
}

export default withRouter(Start);
