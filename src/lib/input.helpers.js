const text = ["name", "surname", "street", "zip", "city"];
const date=["start","finish"]
const phone = ["tel", "mobile"];
const mail = ["mail"];

const inputTypes = { text, phone, mail,date };

function getTypeFromFieldName(fieldName) {
  let fieldNameAsString =
  Object.keys(inputTypes).filter(key => {
    return inputTypes[key].includes(fieldName) ? key : false;
  });

  return fieldNameAsString[0] || "text";
}

export { getTypeFromFieldName };
