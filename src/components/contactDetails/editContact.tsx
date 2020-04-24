import React, { useReducer, FC, useEffect, useState, MouseEvent } from "react";
import {
  IContactsTableModel,
  IInputCallback,
  IMultiInputCallback,
  ValidationTypeEnums,
  IFormData,
  IEditContactProps,
  IEditContactFormAction,
  NewEntryEnums,
  IconNameEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IDatabaseReducer,
  IMessageAction,
  DialogTypes,
  IDialogActionEnums,
} from "../../__typings/interfaces.d";
import Input, { MultipleInput } from "../../__ui/formElements";
import Button from "../../__ui/buttons/button";
import { useSelector, useDispatch } from "react-redux";
import { uuid } from "@nano-sql/core/lib/utilities";
import ConfirmDeleteContactBody, { ConfirmDeleteContactFooter } from "../confirm/delete.contact";
function FormData(data: IContactsTableModel): IFormData {
  return {
    name: { value: data.name, valid: false },
    surname: { value: data.surname, valid: false },
    street: { value: data.street, valid: false },
    city: { value: data.city, valid: false },
    zip: { value: data.zip, valid: false },
    tel: { value: data.tel, valid: false },
    mobile: { value: data.mobile, valid: false },
    mail: { value: data.mail, valid: false },
  };
}

/**
 *
 */
const EditContact: FC<IEditContactProps> = ({ contact, theme, styles, view, onComplete }) => {
  const isNewContact = contact.id === NewEntryEnums.NEW_CONTACT_ID;
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  function editContactFormReducer(state: IFormData, action: IEditContactFormAction): IFormData {
    return { ...state, ...action.data };
  }

  const [contactForm, updateContactForm] = useReducer(editContactFormReducer, FormData(contact));

  function inputCallbackHandler(inputEl: IInputCallback): void {
    if (inputEl.value === contactForm[inputEl.name].value && inputEl.valid === contactForm[inputEl.name].valid) return;
    const action: IEditContactFormAction = {
      type: "UPDATE",
      data: {
        [inputEl.name]: { value: inputEl.value, valid: inputEl.valid },
      },
    };
    updateContactForm(action);
  }

  function multiInputCallbackHandler(inputEl: IMultiInputCallback): void {
    if (
      JSON.stringify(inputEl.value) === JSON.stringify(contactForm[inputEl.name].value) &&
      inputEl.valid === contactForm[inputEl.name].valid
    ) {
      return;
    }
    const action: IEditContactFormAction = {
      type: "UPDATE",
      data: {
        [inputEl.name]: { value: inputEl.value, valid: inputEl.valid },
      },
    };
    updateContactForm(action);
  }
  function deleteContacthandler(): void {
    const dialogId = uuid();
    const dialog: IMessageAction = {
      type: IDialogActionEnums.OPEN,
      message: {
        caption: "Want to delete?",
        dialogType: DialogTypes.CONFIRM,
        body: <ConfirmDeleteContactBody contact={contact} dialogId={dialogId} />,
        footer: <ConfirmDeleteContactFooter contact={contact} dialogId={dialogId} />,
        dialogId,
        closable: true,
      },
    };
    dispatch(dialog);
  }

  function saveContactDetailsToDatabase(e: MouseEvent<HTMLButtonElement>): void {
    e.currentTarget.focus(); // remove focus from last form element to avoid any delayed function calls (Input on blur)
    const clonedContactData: IContactsTableModel = Object.assign({}, contact);
    if (contact.id === NewEntryEnums.NEW_CONTACT_ID) {
      delete clonedContactData.id;
    }
    Object.keys(clonedContactData).forEach((key: string, index: number) => {
      if (key !== "id") {
        clonedContactData[key] = contactForm[key].value;
      }
    });

    nSQL("contactsTable")
      .query("upsert", clonedContactData)
      .exec()
      .then((current: [IContactsTableModel]) => {
        window.setTimeout(() => {
          // wait shortly before chaning state to avoid update on unmounted element (<Input onBlur />)
          onComplete(current[0]);
        }, 300);
      });
  }

  useEffect(() => {
    const formKeys = Object.keys(contactForm);
    const invalidItems = formKeys.filter(key => {
      return contactForm[key].valid === false;
    });
    if (invalidItems.length > 0 && isFormValid === true) {
      setIsFormValid(false);
    }
    if (invalidItems.length === 0 && isFormValid === false) {
      setIsFormValid(true);
    }
  }, [contactForm, isFormValid]);
  return (
    <>
      <Input
        name="name"
        label="name"
        type="text"
        required={false}
        validate={false}
        value={contact.name}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="surname"
        label="surname"
        type="text"
        required={true}
        validate={true}
        validationType={ValidationTypeEnums.TEXT}
        value={contact.surname}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="street"
        label="street"
        type="text"
        required={false}
        validate={false}
        value={contact.street}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="city"
        label="city"
        type="text"
        required={false}
        validate={false}
        value={contact.city}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="zip"
        label="zip"
        type="text"
        required={false}
        validate={true}
        validationType={ValidationTypeEnums.ZIP}
        value={contact.zip}
        infoCallback={inputCallbackHandler}
      />
      <MultipleInput
        name="tel"
        defaultProps={{
          name: "tel",
          label: "telephone",
          type: "phone",
          required: false,
          validate: true,
          validationType: ValidationTypeEnums.PHONE,
        }}
        callback={multiInputCallbackHandler}
        values={contact.tel}
        valid={contact.tel.map(m => false)}
      />
      <MultipleInput
        name="mobile"
        defaultProps={{
          name: "mobile",
          label: "mobile phone",
          type: "phone",
          required: false,
          validate: true,
          validationType: ValidationTypeEnums.PHONE,
        }}
        callback={multiInputCallbackHandler}
        values={contact.mobile}
        valid={contact.mobile.map(m => false)}
      />
      <MultipleInput
        name="mail"
        defaultProps={{
          name: "mail",
          label: "mail",
          type: "mail",
          required: false,
          validate: true,
          validationType: ValidationTypeEnums.MAIL,
        }}
        callback={multiInputCallbackHandler}
        values={contact.mail}
        valid={contact.mail.map(m => false)}
      />
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
          type={ButtonTypeEnums.POSITIVE}
          isDisabled={!isFormValid}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export { EditContact as default };
