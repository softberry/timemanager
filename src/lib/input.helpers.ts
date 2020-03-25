import { ICorrectedTimeFromStep } from "../__typings/interfaces.d";
import moment from "moment";

const correctedTimeFromStep = ({ minutes = 0, step = 0, immediate = false }: ICorrectedTimeFromStep): number => {
  const rest = minutes % step;
  const increaseImmediately = rest === 0 ? 0 : 1;
  const increaseAfter = rest >= 0 ? 0 : 1;
  return minutes - rest + (immediate ? increaseImmediately : increaseAfter) * step;
};

interface ITimeDiff {
  start: string;
  finish: string;
  step: number;
}
const timeDiffToString = ({ start, finish, step }: ITimeDiff): string => {
  const mStart = moment(start);
  const mFinish = moment(finish);
  const hoursDiff = mFinish.diff(mStart, "hours") * 1;

  const minutesDiff = mFinish.subtract(hoursDiff, "hours").diff(mStart, "minutes");

  const minutes = correctedTimeFromStep({
    minutes: minutesDiff,
    step,
    immediate: true,
  });
  const hoursToString = hoursDiff > 0 ? `${hoursDiff} Hours ` : "";
  const minutesToString = minutes > 0 ? `${minutes} Minutes` : "0 Minute";
  return `${hoursToString + minutesToString}`;
};
export { correctedTimeFromStep, timeDiffToString };
