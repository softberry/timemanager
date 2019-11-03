const text = ["name", "surname", "street", "zip", "city"];
const phone = ["tel", "mobile"];
const mail = ["mail"];

const inputTypes = { text, phone, mail };

function getTypeFromFieldName(fieldName) {
  let fieldNameAsString =
  Object.keys(inputTypes).filter(key => {
    return inputTypes[key].includes(fieldName) ? key : false;
  });

  return fieldNameAsString[0] || "text";
}

export { getTypeFromFieldName };
