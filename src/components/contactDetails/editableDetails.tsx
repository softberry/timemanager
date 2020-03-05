import React, {
  useContext,
  useState,
  useCallback,
  ReactElement,
  MouseEvent,
  useReducer,
  createContext,
} from "react";
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
  IStateDatabaseReducer,
  INameToValueMap,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import Button from "../../__ui/buttons/button";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import ViewContext from "../../views";
import Input, { MultipleInput } from "../../__ui/formElements";
import { useSelector, useDispatch } from "react-redux";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

const EditableDetails = (): ReactElement => {
  const excludedItems = ["id"];
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  const nSQL = useSelector(({ db }: IStateDatabaseReducer) => db.nSQL);
  const dispatch = useDispatch();

  const contact = useContext(EditContactContext);
  const dispatcher = useContext(EditContactDispatchContext);
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
    const currentCanBeSaved = ((): boolean => {
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
  function infoCallbackHandler(returnedValue: IInputCallback): void {
    const { name, uniqueName, value, valid } = returnedValue;

    const updatedFieldState = contactsFormFieldsState;
    updatedFieldState.set(uniqueName, { valid, value, name });
    setContactsFormFieldsState(updatedFieldState);
    canBeSavedMemoized();
  }

  function saveContactDetailsToDatabase(e: MouseEvent<HTMLDivElement>): void {
    e.currentTarget.focus();
    const updatedContact = ((): INameToValueMap => {
      const obj: INameToValueMap = {};
      contactsFormFieldsState.forEach((data: INameToValueMap, key: string) => {
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
      //updateContact(current[0], true);
      dispatcher({
        type: "UPDATE",
        contact: current[0],
        readOnly: true,
      });
    });
  }

  function deleteContacthandler(): void {
    dispatch({
      type: IConfirmTypeEnums.DELETE_CONTACT,
      message: {
        caption: "Want to delete?",
        body: { contact: contact },
        closable: true,
      },
    });
  }

  function getContactsKeyMap(oContact: IContactsTableModel): INameToValueMap {
    const keys = Object.keys(oContact);
    return keys;
  }
  return (
    <div>
      {getContactsKeyMap(contact).map(
        (fieldName: keyof IContactsTableModel, key: number): ReactElement => {
          const props: IEditableInputProps = {
            fieldName,
            contact,
            infoCallback: infoCallbackHandler,
          };
          return (
            <div key={key}>
              {!excludedItems.includes(fieldName) && (
                <EditableInput {...props} />
              )}
            </div>
          );
        }
      )}
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
};

function EditableInput({
  fieldName,
  contact,
  infoCallback,
}: IEditableInputProps): ReactElement {
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
const EditContactContext = createContext<IContactsTableModel>({
  id: "",
  name: "",
  surname: "",
  tel: [],
  mobile: [],
  mail: [],
  street: "",
  city: "",
  zip: "",
});
const EditContactDispatchContext = createContext((action: any): void => {
  console.log("//TODO: ");
});

const EditableDetailsForm = ({
  contact,
  updateContact,
}: IEditableDetailsProps): ReactElement => {
  function fnReducer(state: any, action: any) {
    switch (action.type) {
      case "UPDATE":
        updateContact(action.contact, action.readOnly);
        return state;
    }
    return { ...state, ...action };
  }
  const [contactForm, dispatcher] = useReducer(fnReducer, contact);

  return (
    <>
      <EditContactDispatchContext.Provider value={dispatcher}>
        <EditContactContext.Provider value={contactForm}>
          <EditableDetails />
        </EditContactContext.Provider>
      </EditContactDispatchContext.Provider>
    </>
  );
};

export default EditableDetailsForm;
