import {
  ValidationTypeEnums,
  IFieldNameToType,
} from "../__typings/interfaces.d";

const Text: IFieldNameToType = {
  type: "text",
  validationType: ValidationTypeEnums.TEXT,
};

const DateTimeLocal: IFieldNameToType = {
  type: "datetime-local",
  validationType: ValidationTypeEnums.DATE,
};
const Phone: IFieldNameToType = {
  type: "phone",
  validationType: ValidationTypeEnums.PHONE,
};
const Mail: IFieldNameToType = {
  type: "mail",
  validationType: ValidationTypeEnums.MAIL,
};

const fieldNameToType = new Map();

fieldNameToType.set("name", Text);
fieldNameToType.set("surname", Text);
fieldNameToType.set("street", Text);
fieldNameToType.set("city", Text);
fieldNameToType.set("zip", Text);
fieldNameToType.set("tel", Phone);
fieldNameToType.set("mobile", Phone);
fieldNameToType.set("mail", Mail);

fieldNameToType.set("start", DateTimeLocal);
fieldNameToType.set("finsih", DateTimeLocal);

export { fieldNameToType as default };
