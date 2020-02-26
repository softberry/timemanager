import { uuid } from "@nano-sql/core/lib/utilities";
import { Moment } from "moment";

export interface IDesignModel {
  view: string;
}

export interface IDesignActionTypes {
  type: IDesign;
  view?: string;
  theme?: string;
}

export interface ITypographyProps {
  theme?: string;
  children?: any;
}

export interface IContactDetailsComponent {
  type: string;
  contact: IContactsTableModel;
}

export interface IContactViewProps {
  match?: any;
  children?: ReactNode;
}

export interface ICheckBoxComponentProps extends IRadioItemProps {
  /** Value of the check box */
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

export interface IEditableInputProps {
  /** Name of the Input element, which must be uniqe in its parent */
  fieldName: keyof IContactsTableModel;
  /** A Contact from Database */
  contact: IContactsTableModel;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback: (returnedValue: IInputCallback) => any;
}
/** Reaturn value of ``infoCallback`` */
export interface IInputCallback {
  name: string;
  uniqueName: string;
  valid: boolean;
  value: string;
}

export interface IInputProps {
  /** Name of the input field */
  name: string;
  /**  */
  uniqueName: string;
  /** Value  of the input field */
  value?: string | string[] | Date;
  /** Define whether this field should have a value */
  required: boolean;
  /** Set correct validation type */
  validationType?: ValidationTypeEnums;
  /** Should be value of field to be validated. */
  validate: boolean;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback?: (any) => any;
}

interface DateTimeValue {
  start: string;
  finish: string;
  valid: boolean;
}
interface IDateTimeProps {
  /** Start property of a Worklog */
  start?: Moment;
  /** End property of a Worklog */
  finish?: Moment;
  /** Increment Steps of work time logs */
  step: number;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback: (DateTimeValue) => any;
}

// export interface IMultiInputProps extends Omit<IInputProps>, "value" {
//   values?: string[];
// }

/**
 *
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

export interface IButtonProps {
  children?: any;
  icon?: IconEnums;
  align?: ButtonAlignmentEnums;
  onClick: (e: any) => void;
  type: ButtonTypeEnums;
  isDisabled: boolean;
}

export interface IButtonLinkProps extends Omit<IButtonProps, "onClick"> {
  href: any;
}

export interface IMessage {
  icon: IconEnums;
  type: IMessageTypeEnums;
  dialogType: DialogTypes;
  caption?: string;
  body: object;
  closable?: boolean;
  dialogId: any;
  key: any;
}
export interface IDialogBodyProp {
  type: IMessageTypeEnums | IConfirmTypeEnums | DialogTypes;
  props: any;
}

export interface IConfirmDeleteContact extends IMessage {
  contact: IContactsTableModel;
}

export interface IToolbarButton {
  type: IconEnums;
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
  type: DatabaseActionEnums;
  nSQL: any;
}
interface IWorkLogsProps {
  children?: ReactNode;
  contactId: string;
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
  tel?: string[];
  mobile?: string[];
  mail?: string[];
}

export interface IContactsTableQuerie {
  name: string;
  args: any;
  call: any;
}

export interface IReadOnlyContactProps {
  contact: IContactsTableModel;
  editContactHandler: (contact: IContactsTableModel, readOnly?: boolean) => any;
}
export interface IworkTableModel {
  id: string;
  contactID: string;
  name: string;
  description: string;
  labour: IWorkDurationTableModel[];
  materials: IMaterialListTableModel[];
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
  items: materialItemTableModel[];
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

export interface IHeadlineProps {
  /** String, DOM elements React elements those will be rendered in the headline  */
  children: any;
}

export interface IHeadlineBuilderProps extends IHeadlineProps {
  /** Size of Headline elements valid values are 1-6 */
  size: number;
}

/** Material Icon properties */
export interface IIconProps {
  children: IconEnums;
  onClick?: () => any;
  size?: SizeIconEnums;
}

export interface IBadgeProps {
  content: number;
  view?: string;
}

export interface IWorkListItemEntry {
  name: string;
  labour: [{}];
  materials: [{}];
}

export interface ISubpageState {
  type: SubPageViewActionTypes;
  caption: string;
  content?: ReactChild;
}

export interface IFieldNameToType {
  type: "text" | "number" | "phone" | "mail" | "date" | "time";
  validationType: ValidationTypeEnums;
}

interface ICorrectedTimeFromStep {
  minutes: number;
  step: number;
  immediate: boolean;
}

/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ******************     Unique Action Types of Store
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
export enum DatabaseActionEnums {
  REGISTER_DATABASE = uuid(), // "DATABASE_REGISTER_DATABASE",
}
export enum IDesign {
  VIEW = uuid(),
  THEME = uuid(),
}
export enum SubPageViewActionTypes {
  SHOW = uuid(), // "SHOW",
  OUT = uuid(), // "OUT",
  HIDE = uuid(), // "HIDE",
}

export enum ViewSettingsEnums {
  UPDATE_TITLE = uuid(),
}

/** Style definition enums of Message boxes*/
export enum IMessageTypeEnums {
  INFO = uuid(), //"MESSAGES_INFO",
  WARNING = uuid(), //"MESSAGES_INFO",
  ERROR = uuid(), //"MESSAGES_ERROR",
  HIDE_MESSAGE = uuid(), //"MESSAGES_HIDE_MESSAGE",
  HIDE_ALL_MESSAGES = uuid(), //"MESSAGES_HIDE_ALL_MESSAGES",
  DELETE_ALL_MESSAGES = uuid(), //"MESSAGES_DELETE_ALL_MESSAGES",
}

/** Confirm dialog box types. Extended to Message box, allows users to make a decision. */
export enum IConfirmTypeEnums {
  DELETE_CONTACT = uuid(), //"CONFIRM_DELETE_CONTACT",
}

/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ******************     Enums as Constant Values
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
export enum DesignEnums {
  DEFAULT_THEME = "default",
  OCEAN_THEME = "ocean",
  PRIMARY_VIEW = "primary",
  SECONDARY_VIEW = "secondary",
}

export enum UserInfo {
  SELECTED_THEME = "USERSETTINGS_SELECTED_THEME",
}

export enum IconEnums {
  ADD = "add",
  ARROW_BACK = "arrow_back",
  ARROW_DOWN = "keyboard_arrow_down",
  ARROW_FORWARD = "arrow_forward",
  ARROW_UP = "keyboard_arrow_up",
  BLANK = "blank",
  CALENDAR = "date_range",
  CHECK_CIRCLE = "check_circle",
  CHECKBOX_OFF = "check_box_outline_blank",
  CHECKBOX_ON = "check_box",
  CLEAR = "highlight_off",
  CLOSE = "close",
  CONTACTS = "contacts",
  CONFIRM = "assignment_turned_in",
  EDIT = "edit",
  ERROR = "error",
  INFO = "info",
  MAIL = "mail_outline",
  MESSAGE = "chat_bubble_outline",
  PHONE = "local_phone",
  RADIO_OFF = "radio_button_unchecked",
  RADIO_ON = "radio_button_checked",
  SAVE = "save",
  SEARCH = "search",
  SETTINGS = "settings",
  SMART_PHONE = "smartphone",
  TIMER = "timer",
  TRASH = "delete_outline",
  WARNING = "warning",
}

export enum NewEntryEnums {
  NEW_CONTACT_ID = "NEW_CONTACT_ID",
}

/** Input labels can be visually label or placeholder */
export enum LabelTypeEnums {
  LABEL = "LABEL",
  PLACEHOLDER = "PLACEHOLDER",
}

export enum ValidationTypeEnums {
  TEXT = "TEXT",
  ZIP = "ZIP",
  MAIL = "MAIL",
  MOBILE = "MOBILE",
  PHONE = "PHONE",
  DATE = "DATE",
}

export enum ButtonTypeEnums {
  SIMPLE = "simple",
  NEGATIVE = "negative",
  POISITIVE = "positive",
  ERROR = "error",
  WARNING = "warning",
}
export enum ButtonAlignmentEnums {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right",
  STRETCH = "stretch",
  INLINE = "inline",
}
/** Size enums for Material Icons */
export enum SizeIconEnums {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export enum DialogTypes {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CONFIRM = "CONFIRM",
}
