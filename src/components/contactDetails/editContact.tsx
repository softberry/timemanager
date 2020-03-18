import React, {
  useReducer,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import {
  IContactsTableModel,
  IInputCallback,
  IMultiInputCallback,
  ValidationTypeEnums,
} from "../../__typings/interfaces.d";
import Input, { MultipleInput } from "../../__ui/formElements";

interface IEditContactProps {
  contact: IContactsTableModel;
}

interface IEditContactFormAction {
  type: string;
  data: { [key: string]: IFormDataType };
}

interface IFormData {
  [key: string]: IFormDataType;
}
interface IFormDataType {
  value: string | string[];
  valid: boolean;
}
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
const EditContact: FunctionComponent<IEditContactProps> = ({ contact }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  function editContactFormReducer(
    state: IFormData,
    action: IEditContactFormAction
  ): IFormData {
    return { ...state, ...action.data };
  }

  const [contactForm, updateContactForm] = useReducer(
    editContactFormReducer,
    FormData(contact)
  );

  function inputCallbackHandler(inputEl: IInputCallback): void {
    if (
      inputEl.value === contactForm[inputEl.name].value &&
      inputEl.valid === contactForm[inputEl.name].valid
    )
      return;
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
      JSON.stringify(inputEl.value) ===
        JSON.stringify(contactForm[inputEl.name].value) &&
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
      <p>{isFormValid ? "VALID" : "INVALID"}</p>
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
          label: "tel",
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
          label: "mobile",
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
    </>
  );
};

export { EditContact as default };
