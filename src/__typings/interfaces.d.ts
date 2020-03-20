import { uuid } from "@nano-sql/core/lib/utilities";
import { Moment } from "moment";
import { ReactChildren, ReactNode, ReactChild } from "react";
import { nSQL as nSQLInterface } from "@nano-sql/core";
import { RouteComponentProps } from "react-router-dom";

export interface IStoryPageProps {
  viewType: string;
}
export interface INameToValueMap {
  [key: string]: string | number | Map;
}

export interface IContactDetailsComponent {
  type: string;
  contact: IContactsTableModel;
}

type TRouterProps = {
  id: string;
  type: string;
};
export interface IContactViewProps extends RouteComponentProps<TRouterProps> {
  children?: ReactNode;
}

export interface IEditableDetailsProps {
  contact: IContactsTableModel;
  updateContact: (contact: IContactsTableModel, readOnly?: boolean) => void;
}

export interface ICheckBoxComponentProps extends IRadioItemProps {
  /** Value of the check box */
  value?: never;
  /** callback function to be don if checkbox or radio  changes it state */
  onChange: (checked?: boolean) => void;
}

export interface IRadioItemProps {
  /** *initial state to be set* */
  checked?: boolean;
  /** label text identifies the checkbox or radio element */
  label: string;
  /** value of the radio element, whihc will be assigend to radiogroup when it's selected */
  value: string;
  /** callback function to be don if checkbox or radio  changes it state */
  onChange?: (val?: string) => void;
}

export interface IRadioGroupProps {
  children?: ReactNode<IRadioItemProps>;
  onChange: (t: string | ViewEnums) => void;
}

export interface IEditableInputProps {
  /** Name of the Input element, which must be uniqe in its parent */
  fieldName: keyof IContactsTableModel;
  /** A Contact from Database */
  contact: IContactsTableModel;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback: (returnedValue: IInputCallback) => void;
}

/** Reaturn value of ``infoCallback`` */
export interface IInputCallback {
  name: string;
  valid: boolean;
  value: string;
}

export interface IInputProps {
  /** Name of the input field */
  name: string;
  /** User freindly name of input element to be used as label text*/
  label: string;
  /**  */
  // uniqueName: string;
  /** Type of input element */
  type: "text" | "number" | "phone" | "mail" | "date" | "time";
  /** Value  of the input field */
  value?: string; //| string[] | Date;
  /** Define whether this field should have a value */
  required: boolean;
  /** Should be value of field to be validated. */
  validate: boolean;
  /** Defined the Validation rule which should be applied*/
  validationType?: ValidationTypeEnums;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback?: (p: IInputCallback) => void;
}

export interface IMultiInputProps {
  name: string;
  defaultProps: IInputProps;
  values: string[];
  valid: boolean[];
  hash?: string;
  callback: (p: IMultiInputCallback) => void;
}

export interface IMultiInputCallback {
  name: string;
  value: string[];
  valid: boolean;
}

export interface IMultiInputActions {
  type: string;
  value?: string;
  index: number;
  valid: boolean;
}

export interface IDateTimeProps {
  /** Start property of a Worklog */
  start?: Moment;
  /** End property of a Worklog */
  finish?: Moment;
  /** Increment Steps of work time logs */
  step: number;
  /** Callback function that helps to input validation state to sync with its parent */
  infoCallback: (DateTimeValue) => void;
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
  icon?: IconNameEnums;
  align?: ButtonAlignmentEnums;
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  type: ButtonTypeEnums;
  isDisabled: boolean;
}

export interface IButtonLinkProps extends Omit<IButtonProps, "onClick"> {
  href: string;
}

/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ******************     Store reducers and actions
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

export interface IDatabaseReducer {
  db: IDatabaseState;
}
export interface IDatabaseState {
  type: DatabaseActionEnums;
  action: IDatabaseAction;
}

export interface IDatabaseAction {
  nSQL: nSQLInterface;
}

export interface IMessageReducer {
  msg: IMessageState;
}

export interface IMessageState {
  messages: IMessage[];
}

export interface IMessageAction {
  type: IDialogActionEnums;
  message: IMessage;
  dialogId?: number;
}

export interface IMessage {
  // icon: IconNameEnums;
  dialogType: DialogTypes;
  caption?: string;
  body: object;
  footer: object;
  closable?: boolean;
  dialogId: string;
  // key: number;
}

export interface IConfirmDeleteContact {
  contact: IContactsTableModel;
  dialogId: string;
}

export interface ISubPageReducer {
  subPage: ISubPageState;
}

export interface ISubPageState {
  type: SubPageActionEnums;
  action: ISubPageAction;
}

export interface ISubPageAction {
  caption: string;
  content?: ReactChild;
}

export interface IEditWorkLogProps {
  contactID: string;
  worklogID?: string;
}

export interface IEditWorkLogTitleProps {
  name: string;
  description?: string;
  valid?: boolean;
  dispatcher: (p: IWorklogAction) => void;
}

export interface IWorklogBadgeProp {
  contactID: string;
}
export interface IWorklogState extends IWorkTableModel {
  valid: boolean;
}

export interface IWorklogAction {
  type: AddEditWorklogEnums;
  data?: IWorkTableModel;
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
  styles: { [x: string]: string };
  theme: ThemeEnums;
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
  [x: string]: string | string[];
  id: string;
  name: string;
  surname: string;
  street: string;
  zip: string;
  city: string;
  tel: string[];
  mobile: string[];
  mail: string[];
}

export interface IReadOnlyContactProps {
  contact: IContactsTableModel;
  editContactHandler: (contact: IContactsTableModel, readOnly?: boolean) => void;
}

export interface IEditContactDispatchState {
  contact: IContactsTableModel;
  readOnly: boolean;
}

export interface IEditContactProps {
  /** Database Object which will be edited*/
  contact: IContactsTableModel;
  /** Inherit view from parent*/
  view: ViewEnums;
  /** Inherit theme from parent */
  theme: ThemeEnums;
  /** Inherit styles from parent */
  styles: { [x: string]: string };
  /** Callback function to revert form to it's readonly state*/
  onComplete: (p: T) => void;
}

export interface IEditContactFormAction {
  type: string;
  data: { [key: string]: IFormDataType };
}

export interface IFormData {
  [key: string]: IFormDataType;
}
export interface IFormDataType {
  value: string | string[];
  valid: boolean;
}
export interface IWorkTableModel {
  id: string;
  contactID: string;
  name: string;
  description: string;
  labour: IWorkDurationTableModel[];
  materials: IMaterialListTableModel[];
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
  items: MaterialItemTableModel[];
  workID: string;
}

export interface MaterialItemTableModel {
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
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface IHeadlineBuilderProps extends IHeadlineProps {
  /** Size of Headline elements valid values are 1-6 */
  size: number;
}

/** Material Icon properties */
export interface IIconProps {
  children: IconNameEnums;
  onClick?: () => void;
  size?: IconSizeEnums;
}

export interface IBadgeProps {
  content: number;
  view?: ViewEnums;
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
  styles: { [x: string]: string };
}

export interface IViewState {
  type: ViewSettingsEnums;
  design: IViewActionTypes;
  title: string;
}

export interface IViewStateReducer {
  viewSettings: IViewState;
}

export interface IViewActionTypes {
  view: ViewEnums;
  theme: ThemeEnums;
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
  UNDEFINED_DATABASE = uuid(), // "DATABASE_REGISTER_DATABASE",
  REGISTER_DATABASE = uuid(), // "DATABASE_REGISTER_DATABASE",
}

export enum SubPageActionEnums {
  SHOW = uuid(), // "SHOW",
  OUT = uuid(), // "OUT",
  HIDE = uuid(), // "HIDE",
}

export enum ViewSettingsEnums {
  UPDATE_THEME = uuid(),
  UPDATE_TITLE = uuid(),
}

export interface IMessageContentProps {
  type?: IMessageTypeEnums;
}

export enum IDialogActionEnums {
  OPEN = uuid(),
  CLOSE = uuid(),
}

/**
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * ******************     Enums as Constant Values
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
export enum ViewEnums {
  PRIMARY_VIEW = "primary",
  SECONDARY_VIEW = "secondary",
}
export enum ThemeEnums {
  DEFAULT_THEME = "default",
  OCEAN_THEME = "ocean",
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
