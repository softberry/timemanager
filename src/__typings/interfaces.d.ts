export interface IDesignModel {
  view?: string;
}

export interface IDesignActionTypes {
  type: string;
  view?: string;
  theme?: string;
}

export interface ITypographyProps {
  theme?: string;
  children?: any;
}

export interface IContactDetailsComponent extends IDesignModel {
  type: string;
  contact: IContactsTableModel;
}

export interface IContactViewProps {
  match?: any;
  children?: ReactNode;
}

export interface ICheckBoxComponentProps {
  children?: any;
  checked?: boolean;
  label: string;
  onChange: any;
}

export interface IRadioItemProps {
  children?: any;
  checked?: boolean;
  label: string;
  value?: string;
  onChange?: any;
}

export interface IRadioGroupProps {
  children?: any;
  onChange: any;
}

export interface IInputComponentProps {
  name: string;
  value: string;
}

export interface IMultiInputProps extends IInputComponentProps {
  value?: [];
}

export interface IStartStopButtonProps {
  onComplete: any;
  waitForSeconds?: number;
  buttonLabel: IStartStopButtonStates;
}

export interface IStartStopButtonStates {
  active: string;
  inactive: string;
}
export interface IMessage {
  icon?: string;
  type: string;
  caption?: string;
  body: object;
  closable?: boolean;
  dialogId: any;
  key: any;
}
export interface IDialogBodyProp {
  type: string;
  props: any;
}

export interface IConfirmDeleteContact extends IMessage {
  contact: IContactsTableModel;
}

export interface IToolbarButton {
  type: string;
  label?: string;
  disabled?: boolean;
  hidden?: boolean;
  clickAction?: string;
  styles?: any;
  theme?: any;
}

export interface IToolbarButtonAction extends IToolbarButton {
  nSQL?: any;
  contact: any;
}

export interface IToolbarButtonState {
  type: string;
  contact: any;
}
export interface IStateDatabase {
  type: string;
  nSQL: any;
}

export interface IWorklogInput {
  nSQL: any;
  start: Date;
  finish: Date;
  description?: string;
}

export interface ICounterDiffTime {
  hour: number;
  minute: number;
  second: number;
  counting?;
  styles?: any;
  theme?: any;
}

export interface ICounterDiff {
  name: string;
  model: ICounterDiffTime;
}

export interface ICounterTableModel {
  id: string;
  delaying: boolean;
  active: boolean;
  start: number;
  current: number;
  diff: ICounterDiff;
}

export interface IContactsTableModel {
  id: string;
  name?: string;
  surname: string;
  street?: string;
  zip?: string;
  city?: string;
  tel?: [string];
  mobile?: [string];
  mail?: [string];
}

export interface IContactsTableQuerie {
  name: string;
  args: any;
  call: any;
}

export interface IworkTableModel {
  id: string;
  contactID: string;
  name: string;
  labour: [string];
  materials: [string];
  description: string;
}

export interface IworkTableQueryArguments {
  contactID: string;
}

export interface IworkTableQuery {
  name: string;
  args: any;
  call: any;
}

export interface IWorkDurationTableModel {
  id: string;
  start: Date;
  finish: Date;
  description: string;
  workID: string;
}

export interface IMaterialListTableModel {
  id: string;
  items: [materialItemTableModel];
  workID: string;
}

export interface materialItemTableModel {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  unit: string;
  materialListID: string;
}

export interface IMaterialStockTableModel {
  id: string;
  amount: number;
  description: string;
  price: number;
  unit: string;
}

export interface IUnitEnumsTableModel {
  id: string;
  name: string;
}
