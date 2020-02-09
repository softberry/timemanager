import React, { useContext, useState, useCallback } from "react";
import {
  IContactsTableModel,
  IconEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IInputProps,
  IInputCallback
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

  function getContactsMap(obj: {}) {
    return new Map(Object.entries(obj));
  }
  return (
    <div>
      {getContactsMap(contact).forEach((fieldName, key) => {
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

interface IEditableInputProps {
  fieldName: keyof IContactsTableModel;
  contact: IContactsTableModel;
  infoCallback: (returnedValue: IInputCallback) => any;
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
