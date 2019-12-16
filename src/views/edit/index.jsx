import React from "react";

import EditContact from "./edit.contact";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */

export default function Edit(props) {
  switch (props.match.params.type) {
    case "contact":
      return <EditContact {...props} />;
    default:
      return <>Nothing renderable defined</>;
  }
}
