import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TYPES from "../../store/types";

import DefaultLayout from "../../layout/layout.default";

import ContactDetails from "../../components/contactDetails";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */
export default function(props) {
  const [table, setTable] = useState({ id: null });
  const [queryState, setQueryState] = useState("INITIAL");
  const nSQL = useSelector(state => state.db.nSQL);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof nSQL === "undefined") return;
  }, [nSQL]);

  if (queryState === "INITIAL") {
    setQueryState("TRYING");
    nSQL("contactsTable")
      .query("select")
      .where(["id", "=", props.match.params.id])
      .exec()
      .then(item => {
        setTable(item[0]);
        setQueryState("READY");
      })
      .catch(err => {
        setQueryState("ERRORED");
        dispatch({
          type: TYPES.MESSAGES_ERROR,
          caption: err.toString(),
          body: <>{err.stack.toString()}</>,
          closable: true
        });
      });
  }

  useEffect(() => {
    if (queryState === "TRYING") {
      return;
    }
  }, [queryState]);
  // {props.match.params.type}:{props.match.params.id}

  return (
    <DefaultLayout>
      {queryState === "READY" && (
        <ContactDetails
          view="secondary"
          contact={table}
          type={props.match.params.type}
        />
      )}
    </DefaultLayout>
  );
}
