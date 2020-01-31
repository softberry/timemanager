const text = ["name", "surname", "street", "city"]; // <input type="text" ...
const zip = ["zip"]; // <input type="text" ...
const date = ["start", "finish"]; // <input type="date" ...
const phone = ["tel", "mobile"]; // <input type="phone" ...
const mail = ["mail"]; // <input type="mail" ...

const inputTypes: any = { text, phone, mail, date, zip };

function getTypeFromFieldName(fieldName: string): string {
  let fieldNamesAsString: string[] = Object.keys(inputTypes).filter(key => {
    return inputTypes[key].includes(fieldName) ? key : false;
  });

  return fieldNamesAsString[0] || "text";
}

export { getTypeFromFieldName };
