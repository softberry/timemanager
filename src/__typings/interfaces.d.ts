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

export interface ICheckBoxComponentProps extends IRadioItemProps {
  value?: never;
  /** callback function to be don if checkbox or radio  changes it state */
  onChange: (checked?: any) => void;
}

export interface IRadioItemProps {
  /** React elements to be rendered in created checkbox or radio */
  children?: any;
  /** *initial state to be set* */
  checked?: boolean;
  /** label text identifies the checkbox or radio element */
  label: string;
  /** value of the radio element, whihc will be assigend to radiogroup when it's selected */
  value: string;
  /** callback function to be don if checkbox or radio  changes it state */
  onChange?: (checked?: any) => void;
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
/**
 * props for StartStopButton
 */
export interface IStartStopButtonProps {
  /** Apply animation on button if true */
  isTurning?: boolean;
  /** Delayed click function. This callback will  be called on delay time is up*/
  onComplete: () => void;
  /** time to be delayed befor calling the complete event */
  waitForSeconds?: number;
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

export interface IDiff {
  hour: number;
  minute: number;
  second: number;
}
export interface ICounterDiffTime extends IDiff {
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

interface IHeadlineProps {
  /** String, DOM elements React elements those will be rendered in the headline  */
  children: any;
}

interface IHeadlineBuilderProps extends IHeadlineProps {
  /** Size of Headline elements valid values are 1-6 */
  size: number;
}
