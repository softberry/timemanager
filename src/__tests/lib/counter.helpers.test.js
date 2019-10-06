import { twoDigit, timeDiff } from "../../lib/counter.helpers";

describe("twoDigit function", () => {
  const inputs = [-1, 0, 1, 9, 10, 11];
  const outputs = ["00", "00", "01", "09", "10", "11"];

  inputs.forEach((n, i) => {
    test(`Convert "${n}" to ${outputs[i]}`, () => {
      expect(twoDigit(n)).toEqual(outputs[i]);
    });
  });

  test("Out of Boundries should throw typeError", () => {
    function threeDigit() {
      twoDigit(100);
    }
    function wrongTypeString() {
      twoDigit("s");
    }
    function wrongTypeArray() {
      twoDigit([]);
    }
    expect(threeDigit).toThrow(TypeError);
    expect(wrongTypeString).toThrow(TypeError);
    expect(wrongTypeArray).toThrow(TypeError);
    expect(twoDigit()).toEqual("00");
  });
});

describe("timeDiff function", () => {
  test("800ms should return 0", () => {
    const [hour, minute, second] = [0, 0, 0];
    const diff = Date.now() - 800;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });
  test("1200ms should be  0,0,1", () => {
    const [hour, minute, second] = [0, 0, 1];
    const diff = Date.now() - 1200;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });

  test("3s should be  0,0,1", () => {
    const [hour, minute, second] = [0, 0, 3];
    const diff = Date.now() - 3 * 1000;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });

  test("73s should be  0,1,13", () => {
    const [hour, minute, second] = [0, 1, 13];
    const diff = Date.now() - 73 * 1000;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });

  test("245s should be  0,4,5", () => {
    const [hour, minute, second] = [0, 4, 5];
    const diff = Date.now() - 245 * 1000;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });

  test("195s should be  0,4,5", () => {
    const [hour, minute, second] = [0, 4, 45];
    const diff = Date.now() - 4 * 60 * 1000 - 45 * 1000;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });

  test("5dk should be  0,5,0", () => {
    const [hour, minute, second] = [0, 5, 0];
    const diff = Date.now() - 5 * 60 * 1000;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });

  test("61dk should be  1,1,0", () => {
    const [hour, minute, second] = [1, 1, 0];
    const diff = Date.now() - 61 * 60 * 1000;
    expect(timeDiff(diff)).toEqual({ hour, minute, second });
  });
});
