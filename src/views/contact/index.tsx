import React, { useEffect, useState, ReactElement } from "react";
import {
  IContactViewProps,
  IContactsTableModel,
  IMessageTypeEnums,
  DesignEnums,
  IStateDatabaseReducer,
} from "../../__typings/interfaces.d";
import { useSelector, useDispatch } from "react-redux";

import DefaultLayout from "../../layout/layout.default";

import ContactDetails from "../../components/contactDetails";

import ViewContext from "../index";

function ContactView({ match }: IContactViewProps): ReactElement {
  const [table, setTable] = useState<IContactsTableModel>({
    id: "",
    surname: "",
  });
  const [queryState, setQueryState] = useState<string>("INITIAL");
  const nSQL = useSelector(({ db }: IStateDatabaseReducer) => db.nSQL);
  const dispatch = useDispatch();

  if (queryState === "INITIAL") {
    setQueryState("TRYING");
    nSQL("contactsTable")
      .query("select")
      .where(["id", "=", match.params.id])
      .exec()
      .then((item: [IContactsTableModel]) => {
        setTable(item[0]);
        setQueryState("READY");
      })
      .catch((err: Error) => {
        // TODO: fix type error and use err.stack
        setQueryState("ERRORED");
        dispatch({
          type: IMessageTypeEnums.ERROR,
          message: {
            caption: err.toString(),
            body: <>{err.toString()}</>,
            closable: true,
          },
        });
      });
  }

  useEffect(() => {
    if (queryState === "TRYING") {
      return;
    }
  }, [queryState]);

  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        {queryState === "READY" && (
          <ContactDetails type={match.params.type} contact={table} />
        )}
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default ContactView;
