import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import {
  IContactDetailsComponent,
  IworkTableModel,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IReadOnlyContactProps,
  IconEnums,
  IContactsTableModel,
  IInputProps
} from "../../__typings/interfaces.d";

import { useSelector, useDispatch } from "react-redux";

import TYPES from "../../store/action-types";
import Input, { MultipleInput } from "../../__ui/formElements";
import Button, { ButtonLink } from "../../__ui/buttons/button";
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

function ReadOnlyDetails({ contact, propsClass }: IReadOnlyContactProps) {
  const { street, zip, city, tel, mobile, mail } = contact;
  const { styles, theme, view } = propsClass;
  const history = useHistory();
  return (
    <>
      <div className={styles[`ReadOnly-${theme}-${view}-Cart`]}>
        <div className={styles[`ReadOnly-${theme}-${view}-Cart-Title`]}>
          <H1>{`${contact.name} ${contact.surname}`}</H1>
          <Button
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.EDIT}
            onClick={() => history.push(`/contact/edit/${contact.id}`)}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={false}
          />
        </div>
        <div className={styles[`ReadOnly-${theme}-${view}-Address`]}>
          {street}, <br />
          {zip} - {city}{" "}
        </div>
      </div>
      <div className={styles[`ReadOnly-${theme}-${view}-Cart`]}>
        <div className={styles[`ReadOnly-${theme}-${view}-Contact-Buttons`]}>
          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.MAIL}
            href={`mailto:${mail}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={mail === undefined}
          />

          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.SMART_PHONE}
            href={`tel:${mobile}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={mobile === undefined}
          />

          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.PHONE}
            href={`tel:${tel}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={tel === undefined}
          />
        </div>
      </div>
    </>
  );
}

function EditableDetails<T>(contact: IContactsTableModel) {
  const excludedItems = ["id"];
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const history = useHistory();
  return (
    <div>
      {Object.keys(contact).map((fieldName, key) => {
        const props = { fieldName, contact };
        return (
          <div key={key}>
            {!excludedItems.includes(fieldName) && <EditableInput {...props} />}
          </div>
        );
      })}
      <div className={styles[`ContactDetails-${theme}-${view}-Footer`]}>
        <Button
          icon={IconEnums.CLEAR}
          align={ButtonAlignmentEnums.INLINE}
          onClick={history.goBack}
          type={ButtonTypeEnums.NEGATIVE}
          isDisabled={false}
        >
          Cancel
        </Button>
        <Button
          icon={IconEnums.CHECK_CIRCLE}
          align={ButtonAlignmentEnums.INLINE}
          onClick={() => {}}
          type={ButtonTypeEnums.POISITIVE}
          isDisabled={true}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function EditableInput({ fieldName, contact }: any) {
  if (Array.isArray(contact[fieldName])) {
    const multiField = {
      name: fieldName,
      value: contact[fieldName],
      required: fieldName === "surname",
      validate: true,
    };
    return (
      <>
        <MultipleInput {...multiField} />
      </>
    );
  }

  const field: IInputProps = {
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
    dispatch({
      type: TYPES.VIEWSETTINGS.UPDATE_TITLE,
      title: "Contact Details",
    });

    return (
      <div className={viewClass}>
        <ReadOnlyDetails
          contact={contact}
          propsClass={{ styles, theme, view }}
        />
        <Worklogs {...contact} />
      </div>
    );
  }
  const EditableDetailTitle = isNewContact
    ? "Create New Contact"
    : "Edit Contact Details";
  dispatch({
    type: TYPES.VIEWSETTINGS.UPDATE_TITLE,
    title: EditableDetailTitle,
  });

  return (
    <div className={viewClass}>
      <EditableDetails {...contact} />
    </div>
  );
}
export default ContactDetails;
