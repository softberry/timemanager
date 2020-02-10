import { ValidationTypeEnums } from "../__typings/interfaces.d";

const text = ["name", "surname", "street", "city"]; // <input type="text" ...
const zip = ["zip"]; // <input type="text" ...
const date = ["start", "finish"]; // <input type="date" ...
const phone = ["tel", "mobile"]; // <input type="phone" ...
const mail = ["mail"]; // <input type="mail" ...

const inputTypes: any = { text, phone, mail, date, zip };

/**
 *
 * @param fieldName {string}
 */
function getTypeFromFieldName(fieldName: string): string {
  let fieldNamesAsString: string[] = Object.keys(inputTypes).filter(key => {
    return inputTypes[key].includes(fieldName) ? key : false;
  });

  return fieldNamesAsString[0] || "text";
}

function getValidationTypeFromFieldName(
  fieldName: string
): ValidationTypeEnums {
  switch (fieldName) {
    case "zip":
      return ValidationTypeEnums.ZIP;
    case "tel":
      return ValidationTypeEnums.PHONE;
    case "mobile":
      return ValidationTypeEnums.MOBILE;
    case "mail":
      return ValidationTypeEnums.MAIL;
    default:
      return ValidationTypeEnums.TEXT;
  }
}

function getFormElementType(fieldName: string) {
  return {
    type: getTypeFromFieldName(fieldName),
    ValidationType: getValidationTypeFromFieldName(fieldName),
  };
}
export { getFormElementType as default };
