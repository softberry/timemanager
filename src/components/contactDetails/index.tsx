import React, { useState, useEffect, useContext } from "react";
import {
  IContactDetailsComponent,
  IworkTableModel,
} from "../../__typings/interfaces.d";

import { useSelector, useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import Input, { MultipleInput } from "../../__ui/formElements";
import Button from "../../__ui/buttons/button";
import { H1 } from "../../__ui/headline";

import Worklogs from "../worklogs";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ReadOnlyDetails({ contact }: any) {
  const { street, zip, city, tel, mobile } = contact;
  return (
    <>
      <div>
        {street}, {zip} - {city}{" "}
      </div>
      <div>{tel}</div>
      <div>{mobile}</div>
    </>
  );
}

function EditableDetails({ contact }: any) {
  const nonRenderedItems = ["id"];

  return (
    <div>
      {Object.keys(contact).map((fieldName, key) => {
        const props = { fieldName, contact };
        return (
          <div key={key}>
            {!nonRenderedItems.includes(fieldName) && (
              <EditableInput {...props} />
            )}
          </div>
        );
      })}
      <Button icon="save">Save</Button>
    </div>
  );
}

function EditableInput({ fieldName, contact }: any) {
  if (Array.isArray(contact[fieldName])) {
    const multiField = {
      name: fieldName,
      value: contact[fieldName],
      required: fieldName === "surname",
    };
    return (
      <>
        <MultipleInput {...multiField} />
      </>
    );
  }

  const field = {
    name: fieldName,
    value: contact[fieldName],
    required: fieldName === "surname",
    validate: true,
  };

  return (
    <>
      <Input {...field} />
    </>
  );
}

function ContactDetails({ contact, type }: IContactDetailsComponent) {
  const view = useContext(ViewContext);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isNewContact, setIsNewContact] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const nSQL = useSelector((state: any) => state.db.nSQL);
  const viewClass = styles[`ContactDetails-${theme}-${view}`];

  useEffect(() => {
    if (typeof nSQL !== "function") return;
  }, [nSQL]);

  isReadOnly && dispatch({ type: TYPES.TOOLBAR_EDIT_CONTACT, contact });
  !isReadOnly && dispatch({ type: TYPES.TOOLBAR_SAVE_CONTACT, contact });

  const [fullName, setFullName] = useState(
    `${contact.name} ${contact.surname}`
  );

  nSQL("workTable")
    .query("select")
    .where(["contactID", "=", contact.id])
    .exec()
    .then((worklogs: [IworkTableModel]) => {
      dispatch({ type: TYPES.WORKLOGS_UPDATE, worklogs });
    });

  useEffect(() => {
    if (contact.id === null) return;
    if (contact.id === "new-contact-to-edit") {
      setIsReadOnly(false);
      setIsNewContact(true);
    } else {
      setIsReadOnly(type === "details");
    }
    if (fullName.length > 10) {
      const shortName = `${contact.name}`.slice(0, 1);
      setFullName(`${shortName}. ${contact.surname}`);
    }
  }, [setFullName, setIsNewContact, fullName, contact, type]);

  if (isReadOnly) {
    return (
      <div className={viewClass}>
        <H1>{fullName}</H1>
        <ReadOnlyDetails contact={contact} />
        <Worklogs show={true} contact={contact} />
      </div>
    );
  }
  const EditableDetailTitle = isNewContact
    ? "Create New Contact"
    : "Edit Contact Details";

  return (
    <div className={viewClass}>
      <H1>{EditableDetailTitle}</H1>
      <EditableDetails contact={contact} />
      <Worklogs show={false} contact={contact} />
    </div>
  );
}
export default ContactDetails;
