import React, { FunctionComponent, useState, useReducer, useEffect } from "react";
import {
  MaterialItemTableModel,
  ThemeEnums,
  INameToValueMap,
  IconNameEnums,
  ValidationTypeEnums,
  ButtonTypeEnums,
  ButtonAlignmentEnums,
} from "../../__typings/interfaces.d";
import Button from "../../__ui/buttons/button";
import Input from "../../__ui/formElements";

interface MaterialLogItemProps {
  material: MaterialItemTableModel;
  updateCallback: (m: MaterialItemTableModel) => void;
  theme: ThemeEnums;
  styles: INameToValueMap;
}
interface MaterialLogItemState {
  material: MaterialItemTableModel;
  valid: boolean;
  validState: { [key in keyof MaterialItemTableModel]: boolean };
}
interface MaterialLogItemAction {
  type: keyof MaterialItemTableModel;
  value: string;
  valid: boolean;
}
function materialDataReducer(state: MaterialLogItemState, action: MaterialLogItemAction): MaterialLogItemState {
  const newState = {
    ...state,
    material: { ...state.material, [action.type]: action.value },
    validState: {
      ...state.validState,
      [action.type]: action.valid,
    },
  };
  newState.valid = Object.values(newState.validState).reduce((prev: boolean, cur: boolean) => {
    return prev === true && cur === true;
  });
  return newState;
}
const MaterialLogItem: FunctionComponent<MaterialLogItemProps> = ({ material, updateCallback, theme, styles }) => {
  const [isValid, setIsValid] = useState(false);
  const [saveNow, setSaveNow] = useState(false);
  const [materialData, dispatch] = useReducer(materialDataReducer, {
    material,
    valid: false,
    validState: {
      id: true,
      name: false,
      description: true,
      price: false,
      amount: false,
      unit: false,
    },
  });

  useEffect(() => {
    setIsValid(materialData.valid);
  }, [materialData.valid]);

  useEffect(() => {
    if (saveNow === true && materialData.valid === true) {
      updateCallback({ ...materialData.material });
    }
  }, [materialData.material, materialData.valid, saveNow, updateCallback]);
  return (
    <div className={styles[`WorkLogItem-${theme}`]}>
      <div className={styles[`WorkLogItem-${theme}-FormContent`]}>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Name`]}>
          <Input
            name="name"
            label="name"
            type="text"
            required={true}
            validate={true}
            value={material.name}
            validationType={ValidationTypeEnums.TEXT}
            infoCallback={(p): void => {
              dispatch({ type: "name", value: p.value, valid: p.valid });
            }}
          />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Desc`]}>
          <Input
            name="description"
            label="Description"
            type="text"
            required={false}
            validate={false}
            value={material.description}
            infoCallback={(p): void => {
              dispatch({ type: "description", value: p.value, valid: p.valid });
            }}
          />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Price`]}>
          <Input
            name="price"
            label="price"
            type="text"
            required={false}
            validate={true}
            value={material.price}
            validationType={ValidationTypeEnums.CURRENCY}
            infoCallback={(p): void => {
              dispatch({ type: "price", value: p.value, valid: p.valid });
            }}
          />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Amount`]}>
          <Input
            name="amount"
            label="amount"
            type="text"
            required={false}
            validate={true}
            value={material.amount}
            validationType={ValidationTypeEnums.DECIMAL}
            infoCallback={(p): void => {
              dispatch({ type: "amount", value: p.value, valid: p.valid });
            }}
          />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Unit`]}>
          <Input
            name="unit"
            label="unit"
            type="text"
            required={false}
            validate={false}
            value={material.unit}
            infoCallback={(p): void => {
              dispatch({ type: "unit", value: p.value, valid: p.valid });
            }}
          />
        </div>
      </div>
      <div>
        <Button
          type={ButtonTypeEnums.POSITIVE}
          align={ButtonAlignmentEnums.RIGHT}
          icon={IconNameEnums.CHECK_CIRCLE}
          isDisabled={!isValid}
          onClick={(): void => {
            setSaveNow(true);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default MaterialLogItem;
