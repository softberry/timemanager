import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import Input, { MultipleInput } from "../../__ui/formElements";
import Worklogs from "../worklogs";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ReadOnlyDeatils({ contact }: any) {
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
      {Object.keys(contact).map((item, key) => {
        const props = { item, contact };
        return (
          <div key={key}>
            {!nonRenderedItems.includes(item) && <EditableInput {...props} />}
          </div>
        );
      })}
    </div>
  );
}

function EditableInput({ item, contact }: any) {
  const field = {
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

export default function ContactDetails({
  contact,
  type,
  view
}: IContactDetailsComponent) {
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
        <h1>{fullName}</h1>
        <ReadOnlyDeatils contact={contact} />
        <Worklogs show={true} contact={contact} />
      </div>
    );
  }
  const EditableDetailTitle = isNewContact
    ? "Create New Contact"
    : "Edit Contact Deatils";

  return (
    <div className={viewClass}>
      <h1>{EditableDetailTitle}</h1>
      <EditableDetails contact={contact} />
      <Worklogs show={false} contact={contact} />
    </div>
  );
}
