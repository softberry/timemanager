import React, { useContext, useState, useCallback } from "react";
import {
  IContactsTableModel,
  IconNameEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IInputProps,
  IInputCallback,
  IEditableInputProps,
  IConfirmTypeEnums,
  NewEntryEnums,
  DesignEnums,
  IEditableDetailsProps,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import Button from "../../__ui/buttons/button";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import ViewContext from "../../views/index";
import Input, { MultipleInput } from "../../__ui/formElements";
import { useSelector, useDispatch } from "react-redux";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function EditableDetails<T>({ contact, updateContact }: IEditableDetailsProps) {
  const excludedItems = ["id"];
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const nSQL = useSelector((state: any) => state.db.nSQL);
  const dispatch = useDispatch();

  const isNewContact = contact.id === NewEntryEnums.NEW_CONTACT_ID;

  const fieldStateMap = new Map();
  /** Keep Contact Details form in a map */
  const [contactsFormFieldsState, setContactsFormFieldsState] = useState(
    fieldStateMap
  );
  /** Active State of save button */
  const [canBeSaved, setCanBeSaved] = useState(false);

  /**
   * Use memoized callback to avoid unnecessary re-renders
   */
  const canBeSavedMemoized = useCallback(() => {
    const currentCanBeSaved = (() => {
      const result = Array.from(contactsFormFieldsState.values()).filter(
        ({ valid }) => valid === false
      );
      return result.length === 0;
    })();

    setCanBeSaved(currentCanBeSaved);
  }, [setCanBeSaved, contactsFormFieldsState]);
  /**
   * Handler to update form from input elements.
   * This funcition is given to all child input/multiinput elements as prop
   * @param returnedValue
   */
  function infoCallbackHandler(returnedValue: IInputCallback) {
    const { name, uniqueName, value, valid } = returnedValue;

    const updatedFieldState = contactsFormFieldsState;
    updatedFieldState.set(uniqueName, { valid, value, name });
    setContactsFormFieldsState(updatedFieldState);
    canBeSavedMemoized();
  }

  function saveContactDetailsToDatabase(e: any) {
    e.currentTarget.focus();
    const updatedContact = (() => {
      const obj: any = {};
      contactsFormFieldsState.forEach((data: any, key: string) => {
        obj[key] = data.value;
      });

      return obj;
    })();

    const saveUserQuery = nSQL("contactsTable").query("upsert", updatedContact);
    if (contact.id !== NewEntryEnums.NEW_CONTACT_ID) {
      saveUserQuery.where(["id", "=", contact.id]);
    }

    saveUserQuery.exec().then((current: [IContactsTableModel]) => {
      if (current[0].id === NewEntryEnums.NEW_CONTACT_ID) {
        nSQL("contactsTable")
          .query("delete")
          .where(["id", "=", NewEntryEnums.NEW_CONTACT_ID]);
      }
      updateContact(current[0], true);
    });
  }
  //  <ConfirmDeleteContactBody {...props} />
  function deleteContacthandler() {
    dispatch({
      type: IConfirmTypeEnums.DELETE_CONTACT,
      caption: "Want to delete?",
      body: { contact: contact },
      closable: true,
    });
  }
  function getContactsKeyMap(oContact: IContactsTableModel): any[] {
    return Object.keys(oContact);
  }
  return (
    <div>
      {getContactsKeyMap(contact).map((fieldName, key) => {
        const props: IEditableInputProps = {
          fieldName,
          contact,
          infoCallback: infoCallbackHandler,
        };
        return (
          <div key={key}>
            {!excludedItems.includes(fieldName) && <EditableInput {...props} />}
          </div>
        );
      })}
      <div className={styles[`ContactDetails-${theme}-${view}-Footer`]}>
        {!isNewContact && (
          <Button
            icon={IconNameEnums.CLEAR}
            align={ButtonAlignmentEnums.INLINE}
            onClick={deleteContacthandler}
            type={ButtonTypeEnums.WARNING}
            isDisabled={false}
          >
            Delete
          </Button>
        )}
        <Button
          icon={IconNameEnums.CHECK_CIRCLE}
          align={ButtonAlignmentEnums.INLINE}
          onClick={saveContactDetailsToDatabase}
          type={ButtonTypeEnums.POISITIVE}
          isDisabled={!canBeSaved}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function EditableInput({
  fieldName,
  contact,
  infoCallback,
}: IEditableInputProps) {
  if (Array.isArray(contact[fieldName])) {
    const multiField: IInputProps = {
      name: fieldName,
      uniqueName: fieldName,
      value: contact[fieldName],
      required: false,
      validate: true,
      infoCallback,
    };
    return (
      <>
        <MultipleInput {...multiField} />
      </>
    );
  }

  const field: IInputProps = {
    name: fieldName,
    uniqueName: fieldName,
    value: contact[fieldName],
    required: fieldName === "surname",
    validate: true,
    infoCallback,
  };

  return (
    <>
      <Input {...field} />
    </>
  );
}

export default EditableDetails;
