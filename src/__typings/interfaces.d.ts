import { uuid } from "@nano-sql/core/lib/utilities";
import { Moment } from "moment";
import { ReactChildren, ReactNode } from "react";
import { nSQL as nSQLInterface } from "@nano-sql/core";

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

export interface IEditableDetailsProps {
  contact: IContactsTableModel;
  updateContact: (contact: IContactsTableModel, readOnly?: boolean) => any;
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
  /** Should Element collapsed or Exapnded  */
  collapsed: CollapsedState;
}

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
  icon?: IconNameEnums;
  align?: ButtonAlignmentEnums;
  onClick: (e: any) => void;
  type: ButtonTypeEnums;
  isDisabled: boolean;
}

export interface IButtonLinkProps extends Omit<IButtonProps, "onClick"> {
  href: string;
}
export interface IRootReducer {
  db: IStateDatabaseReducer;
  msg: IMessageState;
  confirm: any;
  subpageview: any;
  design: any;
  viewSettings: any;
}

interface IMessagePayload {
  type: IMessageTypeEnums | IConfirmTypeEnums;
  message: IMessage;
  dialogId?: number;
}

interface IMessageState {
  messages: IMessage[];
}
export interface IMessage {
  icon: IconNameEnums;
  dialogType: DialogTypes;
  caption?: string;
  body: object;
  closable?: boolean;
  dialogId: number;
  key: number;
}
export interface IDialogBodyProp {
  type: IMessageTypeEnums | IConfirmTypeEnums | DialogTypes;
  props: any;
}

export interface IConfirmDeleteContact extends IMessage {
  contact: IContactsTableModel;
}
export interface IStateDatabase {
  type: DatabaseActionEnums;
  nSQL: nSQLInterface;
}
export interface IStateDatabaseReducer {
  db: IStateDatabase;
}
export interface IEditWorkLogProps {
  contactID: string;
  worklogID?: string;
}

export interface IEditWorkLogTitleProps {
  name: string;
  description?: string;
  valid?: boolean;
  dispatcher: any;
}

export interface IWorklogBadgeProp {
  contactID: string;
}
export interface IWorklogState extends IWorkTableModel {
  valid: boolean;
}

export interface IWorklogAction {
  type: AddEditWorklogEnums;
  data: IWorkTableModel;
  input?: IInputCallback;
}

export interface IWorklogInput {
  nSQL: nSQLInterface;
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
export interface IWorkTableModel {
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
  children: IconNameEnums;
  onClick?: () => any;
  size?: IconSizeEnums;
}

export interface IBadgeProps {
  content: number;
  view?: string;
}

export interface ITippProps {
  children: ReactChildren | ReactNode;
}

export interface IWorkListItemEntry {
  name: string;
  labour: [{}];
  materials: [{}];
}
export interface INavProps {
  length: number;
  goBack?: () => void;
  goForward?: () => void;
  theme: string;
  styles: any;
}
export interface ISubpageState {
  type: SubPageViewActionTypes;
  caption: string;
  content?: ReactChild;
}

export interface ISubpageStateReducer {
  subpageview: ISubpageState;
}

export interface IViewState {
  type: ViewSettingsEnums;
  title: string;
}
export interface IViewStateReducer {
  // type: never;
  design: IDesignActionTypes;
}

export interface IFieldNameToType {
  type: "text" | "number" | "phone" | "mail" | "date" | "time";
  validationType: ValidationTypeEnums;
}

export interface ICorrectedTimeFromStep {
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

export interface IMessageContentProps {
  type?: IMessageTypeEnums;
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

export enum IconNameEnums {
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

export enum AddEditWorklogEnums {
  INIT = "INIT",
  TITLE = "TITLE",
  DESCRIPTION = "DESCRIPTION",
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
export enum IconSizeEnums {
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

export enum CollapsedState {
  COLLAPSED = "collapsed",
  EXPANDED = "expanded",
}
