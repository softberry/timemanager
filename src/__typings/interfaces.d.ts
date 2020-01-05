interface IDesignModel {
  view?: string;
}

interface IDesignActionTypes {
  type: string;
  view?: string;
  theme?: string;
}

interface ITypographyProps {
  theme?: string;
  children?: any;
}

interface IContactDetailsComponent extends IDesignModel {
  type: string;
  contact: IContactsTableModel;
}

interface IContactViewProps  {
  match?: any;
  children?: ReactNode;
};

interface ICheckBoxComponentProps {
  children?: any;
  checked?: boolean;
  label: string;
  onChange: any;
}

interface IRadioItemProps {
  children?: any;
  checked?: boolean;
  label: string;
  value?: string;
  onChange?: any;
}

interface IRadioGroupProps {
  children?: any;
  onChange: any;
}

interface IInputComponentProps {
  id: string;
  name: string;
  value: string;
}

interface IMultiInputProps extends IInputComponentProps {
  value?: [];
}
interface IStartStopButtonProps {
  onComplete: any;
  waitForSeconds?: number;
  buttonLabel: IStartStopButtonStates;
}

interface IStartStopButtonStates {
  active: string;
  inactive: string;
}
interface IMessage {
  icon?: string;
  type: string;
  caption?: string;
  body: object;
  closable?: boolean;
  dialogId: any;
  key: any;
}

interface IConfirmDeleteContact extends IMessage {
  contact: IContactsTableModel;
}

interface IToolbarButton {
  type: string;
  label?: string;
  disabled?: boolean;
  hidden?: boolean;
  clickAction?: string;
  styles?: any;
  theme?: any;
}

interface IToolbarButtonAction extends IToolbarButton {
  nSQL?: any;
  contact: any;
}

interface IToolbarButtonState {
  type: string;
  contact: any;
}
interface IStateDatabase {
  type: string;
  nSQL: any;
}

interface IWorklogInput {
  nSQL: any;
  start: Date;
  finish: Date;
  description?: string;
}

interface ICounterDiffTime {
  hour: number;
  minute: number;
  second: number;
  counting?;
  styles?: any;
  theme?: any;
}

interface ICounterDiff {
  name: string;
  model: ICounterDiffTime;
}

interface ICounterTableModel {
  id: string;
  delaying: boolean;
  active: boolean;
  start: number;
  current: number;
  diff: ICounterDiff;
}

interface IContactsTableModel {
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

interface IContactsTableQuerie {
  name: string;
  args: any;
  call: any;
}

interface IworkTableModel {
  id: string;
  contactID: string;
  name: string;
  labour: [string];
  materials: [string];
  description: string;
}

interface IworkTableQueryArguments {
  contactID: string;
}

interface IworkTableQuery {
  name: string;
  args: any;
  call: any;
}

interface IWorkDurationTableModel {
  id: string;
  start: Date;
  finish: Date;
  description: string;
  workID: string;
}

interface IMaterialListTableModel {
  id: string;
  items: [materialItemTableModel];
  workID: string;
}

interface materialItemTableModel {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
  unit: string;
  materialListID: string;
}

interface IMaterialStockTableModel {
  id: string;
  amount: number;
  description: string;
  price: number;
  unit: string;
}

interface IUnitEnumsTableModel {
  id: string;
  name: string;
}
