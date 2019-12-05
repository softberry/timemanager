import React from "react";

import EditCustomer from "./edit.customer";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */

export default function Edit(props) {
  props.location.state.toolbar = [];
  switch (props.match.params.type) {
    case "customer":
      return <EditCustomer {...props} />;
    default:
      return <>Nothing renderable defined</>;
  }
}
