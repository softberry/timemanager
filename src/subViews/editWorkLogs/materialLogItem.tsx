import React, { FunctionComponent } from "react";
import {
  MaterialItemTableModel,
  ThemeEnums,
  INameToValueMap,
  IconNameEnums,
  IconSizeEnums,
  ValidationTypeEnums,
} from "../../__typings/interfaces.d";
import Icon from "../../__ui/icon";
import Input from "../../__ui/formElements";

interface MaterialLogItemProps {
  item: MaterialItemTableModel;
  theme: ThemeEnums;
  styles: INameToValueMap;
}
const MaterialLogItem: FunctionComponent<MaterialLogItemProps> = ({ item, theme, styles }) => {
  return (
    <div className={styles[`WorkLogItem-${theme}`]}>
      <div className={styles[`WorkLogItem-${theme}-Caption`]}>
        <div className={styles[`WorkLogItem-${theme}-Caption--Name`]}>Name</div>
        <div className={styles[`WorkLogItem-${theme}-Caption--Total`]}>total</div>
      </div>
      <div className={styles[`WorkLogItem-${theme}-FormContent`]}>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Arrow`]}>
          <Icon size={IconSizeEnums.SMALL}>{IconNameEnums.ARROW_DOWN}</Icon>
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Name`]}>
          <Input
            name="name"
            label="name"
            type="text"
            required={true}
            validate={true}
            validationType={ValidationTypeEnums.TEXT}
          />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Desc`]}>
          <Input name="description" label="Description" type="text" required={false} validate={false} />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Price`]}>
          <Input name="price" label="price" type="text" required={false} validate={false} />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Amount`]}>
          <Input name="amount" label="amount" type="text" required={false} validate={false} />
        </div>
        <div className={styles[`WorkLogItem-${theme}-FormContent--Unit`]}>
          <Input name="unit" label="unit" type="text" required={false} validate={false} />
        </div>
      </div>
    </div>
  );
};

export default MaterialLogItem;
