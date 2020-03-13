import React, { useEffect, useState, ReactElement } from "react";
import {
  IContactViewProps,
  IContactsTableModel,
  ViewEnums,
  IDatabaseReducer,
  DialogTypes,
  IDialogActionEnums,
} from "../../__typings/interfaces.d";
import { useSelector, useDispatch } from "react-redux";

import DefaultLayout from "../../layout/layout.default";

import ContactDetails from "../../components/contactDetails";

import ViewContext from "../index";
import { uuid } from "@nano-sql/core/lib/utilities";

function ContactView({ match }: IContactViewProps): ReactElement {
  const [table, setTable] = useState<IContactsTableModel>({
    id: "",
    surname: "",
    name: "",
    street: "",
    city: "",
    zip: "",
    mail: [],
    tel: [],
    mobile: [],
  });
  const [queryState, setQueryState] = useState<string>("INITIAL");
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
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
          type: IDialogActionEnums.OPEN,
          message: {
            dialogType: DialogTypes.ERROR,
            caption: err.toString(),
            body: <>{err.toString()}</>,
            closable: true,
            dialogId: uuid(),
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
    <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        {queryState === "READY" && (
          <ContactDetails type={match.params.type} contact={table} />
        )}
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default ContactView;
