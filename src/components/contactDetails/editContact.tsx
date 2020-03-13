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
} from "../../__typings/interfaces";
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
    const action: IEditContactFormAction = {
      type: "UPDATE",
      data: {
        [inputEl.uniqueName]: { value: inputEl.value, valid: inputEl.valid },
      },
    };
    if (
      inputEl.value === contactForm[inputEl.name].value &&
      inputEl.valid === contactForm[inputEl.name].valid
    )
      return;
    updateContactForm(action);
  }

  function multiInputCallbackHandler(inputEl: IMultiInputCallback): void {
    //FIXME: Multiple input has no unique name.
    //FIXME: Multiple input values[] insterad of value. doesnt match with input update
    if (
      JSON.stringify(inputEl.values) ===
        JSON.stringify(contactForm[inputEl.name].value) &&
      inputEl.valid === contactForm[inputEl.name].valid
    )
      return;
    const action: IEditContactFormAction = {
      type: "UPDATE",
      data: {
        [inputEl.name]: { value: inputEl.values, valid: inputEl.valid },
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
        uniqueName="name"
        required={false}
        validate={false}
        value={contact.name}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="surname"
        label="surname"
        uniqueName="surname"
        required={true}
        validate={true}
        value={contact.surname}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="street"
        label="street"
        uniqueName="street"
        required={false}
        validate={false}
        value={contact.street}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="city"
        label="city"
        uniqueName="city"
        required={false}
        validate={false}
        value={contact.city}
        infoCallback={inputCallbackHandler}
      />
      <Input
        name="zip"
        label="zip"
        uniqueName="zip"
        required={false}
        validate={true}
        value={contact.zip}
        infoCallback={inputCallbackHandler}
      />
      <MultipleInput
        name="tel"
        defaultProps={{
          name: "tel",
          label: "tel",
          uniqueName: "tel",
          required: false,
          validate: true,
        }}
        callback={multiInputCallbackHandler}
        values={contact.tel}
      />
      <MultipleInput
        name="mobile"
        defaultProps={{
          name: "mobile",
          label: "mobile",
          uniqueName: "mobile",
          required: false,
          validate: true,
        }}
        callback={multiInputCallbackHandler}
        values={contact.mobile}
      />
      <MultipleInput
        name="mail"
        defaultProps={{
          name: "mail",
          label: "mail",
          uniqueName: "mail",
          required: false,
          validate: true,
        }}
        callback={multiInputCallbackHandler}
        values={contact.mail}
      />
    </>
  );
};

export { EditContact as default };
