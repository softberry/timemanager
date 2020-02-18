import React, { useEffect, useState } from "react";
import {
  IContactViewProps,
  IContactsTableModel,
  IMessageTypeEnums,
} from "../../__typings/interfaces.d";
import { useSelector, useDispatch } from "react-redux";

import { VDESIGN } from "../../store/constant-enums";

import DefaultLayout from "../../layout/layout.default";

import ContactDetails from "../../components/contactDetails";

import ViewContext from "../index";

function ContactView({ match }: IContactViewProps) {
  const [table, setTable] = useState<IContactsTableModel>({
    id: "",
    surname: "",
  });
  const [queryState, setQueryState] = useState<string>("INITIAL");
  const nSQL: any = useSelector((state: any) => state.db.nSQL);
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
      .catch((err: any) => {
        setQueryState("ERRORED");
        dispatch({
          type: IMessageTypeEnums.ERROR,
          caption: err.toString(),
          body: <>{err.stack.toString()}</>,
          closable: true,
        });
      });
  }

  useEffect(() => {
    if (queryState === "TRYING") {
      return;
    }
  }, [queryState]);

  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        {queryState === "READY" && (
          <ContactDetails type={match.params.type} contact={table} />
        )}
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default ContactView;
