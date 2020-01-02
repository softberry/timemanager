import React, {
  FunctionComponent,
  useEffect,
  useState,
  ReactNode
} from "react";
import { useSelector, useDispatch } from "react-redux";
import TYPES from "../../store/action-types";

import DefaultLayout from "../../layout/layout.default";

import ContactDetails from "../../components/contactDetails";

/**
 * Renders editable form from given values in given table
 * @param {Object} props
 */
type ContactViewProps = {
  match?: any;
  children?: ReactNode;
};
// const NanoDatabase: FunctionComponent = ({ children }: NanoDatabaseProps)
const ContactView: FunctionComponent = ({ match }: ContactViewProps) => {
  const [table, setTable] = useState<IContactsTableModel>({
    id: "",
    surname: ""
  });
  const [queryState, setQueryState] = useState<string>("INITIAL");
  const nSQL: any = useSelector((state: any) => state.db.nSQL);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof nSQL === "undefined") return;
  }, [nSQL]);

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
          view={TYPES.DESIGN_VIEW_SECONDARY}
          type={match.params.type}
          contact={table}
        />
      )}
    </DefaultLayout>
  );
};

export default ContactView;
