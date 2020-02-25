import {
  ValidationTypeEnums,
  IFieldNameToType,
  ICorrectedTimeFromStep,
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

const correctedTimeFromStep = ({
  minutes = 0,
  step = 0,
  immediate = false,
}: ICorrectedTimeFromStep) => {
  const rest = minutes % step;
  const increaseImmediately = rest === 0 ? 0 : 1;
  const increaseAfter = rest >= 0 ? 0 : 1;
  return (
    minutes - rest + (immediate ? increaseImmediately : increaseAfter) * step
  );
};

interface ITimeDiff {
  hours: number;
  minutes: number;
}
const timeDiffToString = ({ hours = 0, minutes = 0 }: ITimeDiff) => {
  const hoursToString = hours > 0 ? `${hours} Hours ` : "--:";
  const minutesToString = minutes > 0 ? `${minutes} Minutes` : "--";
  return `${hoursToString + minutesToString}`;
};
export { fieldNameToType as default, correctedTimeFromStep, timeDiffToString };
