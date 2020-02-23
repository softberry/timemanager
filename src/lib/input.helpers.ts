import {
  ValidationTypeEnums,
  IFieldNameToType,
} from "../__typings/interfaces.d";

const Text: IFieldNameToType = {
  type: "text",
  validationType: ValidationTypeEnums.TEXT,
};

const Phone: IFieldNameToType = {
  type: "phone",
  validationType: ValidationTypeEnums.PHONE,
};
const Mail: IFieldNameToType = {
  type: "mail",
  validationType: ValidationTypeEnums.MAIL,
};

const fieldNameToTypeMap = new Map();

fieldNameToTypeMap.set("name", Text);
fieldNameToTypeMap.set("surname", Text);
fieldNameToTypeMap.set("street", Text);
fieldNameToTypeMap.set("city", Text);
fieldNameToTypeMap.set("zip", Text);
fieldNameToTypeMap.set("tel", Phone);
fieldNameToTypeMap.set("mobile", Phone);
fieldNameToTypeMap.set("mail", Mail);

function fieldNameToType(fieldName: string) {
  if (fieldNameToTypeMap.has(fieldName))
    return fieldNameToTypeMap.get(fieldName);
  return Text;
}

const correctedTimeFromStep = (minutes: number, step: number) => {
  return minutes + step - (minutes % step);
};
export { fieldNameToType as default, correctedTimeFromStep };
