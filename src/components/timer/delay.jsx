import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";


export default function Delay({ show, value }) {
  if (!show) return "";

  return <LinearProgress variant="determinate" value={value} />;
}
