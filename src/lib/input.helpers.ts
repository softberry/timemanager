import { ICorrectedTimeFromStep } from "../__typings/interfaces.d";

const correctedTimeFromStep = ({ minutes = 0, step = 0, immediate = false }: ICorrectedTimeFromStep): number => {
  const rest = minutes % step;
  const increaseImmediately = rest === 0 ? 0 : 1;
  const increaseAfter = rest >= 0 ? 0 : 1;
  return minutes - rest + (immediate ? increaseImmediately : increaseAfter) * step;
};

interface ITimeDiff {
  hours: number;
  minutes: number;
}
const timeDiffToString = ({ hours = 0, minutes = 0 }: ITimeDiff): string => {
  const hoursToString = hours > 0 ? `${hours} Hours ` : "--:";
  const minutesToString = minutes > 0 ? `${minutes} Minutes` : "--";
  return `${hoursToString + minutesToString}`;
};
export { correctedTimeFromStep, timeDiffToString };
