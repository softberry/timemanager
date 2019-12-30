import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import TYPES from "../../store/types";
import Input, { MultipleInput } from "../../__ui/formElements";
import Worklogs from "../../components/worklogs";

import styles from "./contact.module.scss";

function ReadOnlyDeatils({ contact }) {
  const { street, zip, city, tel, mobile } = contact;
  return (
    <div className={styles.ReadOnly}>
      <div>
        {street}, {zip} - {city}{" "}
      </div>
      <div>{tel}</div>
      <div>{mobile}</div>
    </div>
  );
}

function EditableList({ contact }) {
  const nonRenderedItems = ["id"];

  return (
    <div>
      {Object.keys(contact).map((item, key) => {
        const props = { item, contact };
        return (
          <div key={key}>
            {!nonRenderedItems.includes(item) && <UpdateOnEdit {...props} />}
          </div>
        );
      })}
    </div>
  );
}

function UpdateOnEdit({ item, contact }) {
  const field = {
    id: `${contact.id}-${item}`,
    name: item,
    value: contact[item]
  };
  
  return (
    <>
      {Array.isArray(field.value) && <MultipleInput {...field} />}
      {!Array.isArray(field.value) && <Input {...field} />}
    </>
  );
}

function ContactDetails(props) {
  const { contact, type } = props;

  const [locked, setLocked] = useState(true);
  const [isNewContact, setIsNewContact] = useState(false);
  const dispatch = useDispatch();

  const nSQL = useSelector(state => state.db.nSQL);

  useEffect(() => {
    if (typeof nSQL !== "function") return;
  }, [nSQL]);

  locked && dispatch({ type: TYPES.TOOLBAR_EDIT_CONTACT, contact });
  !locked && dispatch({ type: TYPES.TOOLBAR_SAVE_CONTACT, contact });

  const [fullName, setFullName] = useState(
    `${contact.name} ${contact.surname}`
  );

  useEffect(() => {
    if (contact.id === null) return;
    if (contact.id === "new-contact-to-edit") {
      setLocked(false);
      setIsNewContact(true);
    } else {
      setLocked(type === "details");
    }
    if (fullName.length > 10) {
      const shortName = `${contact.name}`.slice(0, 1);
      setFullName(`${shortName}. ${contact.surname}`);
    }
  }, [setFullName, setIsNewContact, fullName, contact, type]);

  return (
    <>
      {locked && <h1>{fullName}</h1>}
      {locked && <ReadOnlyDeatils contact={contact} />}
      {!locked && !isNewContact && <h1>Edit Contact Deatils</h1>}
      {!locked && isNewContact && <h1>Create New Contact</h1>}
      {!locked && <EditableList contact={contact} />}
      <Worklogs show={locked} contact={contact} />
    </>
  );
}
export default withRouter(ContactDetails);
