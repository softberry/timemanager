import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  IContactsTableModel,
  IconEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IInputProps,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { useHistory } from "react-router-dom";

import Button from "../../__ui/buttons/button";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../../views/index";
import Input, { MultipleInput } from "../../__ui/formElements";


const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function EditableDetails<T>(contact: IContactsTableModel) {
  const history = useHistory();
  const excludedItems = ["id"];
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);

  interface IInputCallback {
    name: string;
    valid: boolean;
  }
  const fieldStateMap = new Map();
  const [contactsFormFieldsState, setContactsFormFieldsState] = useState(
    fieldStateMap
  );
  const [canBeSaved, setCanBeSaved] = useState(false);

  const saveStateCallback = useCallback(() => {
    setCanBeSaved(!Object.values(contactsFormFieldsState).includes(false));
    // console.log(canBeSaved);
  }, [contactsFormFieldsState]);

  function infoCallbackHandler(returnedValue: IInputCallback) {
    console.log(contactsFormFieldsState);
    const { name, valid } = returnedValue;

    if (contactsFormFieldsState.get(name) === valid) return;

    const s = contactsFormFieldsState;
    s.set(name, valid);

    setContactsFormFieldsState(s);
    saveStateCallback();
  }

  useEffect(() => {
    console.log(contactsFormFieldsState);
  }, [contactsFormFieldsState]);
  return (
    <div>
      {Object.keys(contact).map((fieldName, key) => {
        const props = { fieldName, contact, infoCallback: infoCallbackHandler };
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
          isDisabled={!canBeSaved}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

function EditableInput({ fieldName, contact, infoCallback }: any) {
  if (Array.isArray(contact[fieldName])) {
    const multiField = {
      name: fieldName,
      uniqueName: fieldName,
      value: contact[fieldName],
      required: fieldName === "tel",
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
