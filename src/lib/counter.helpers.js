function twoDigit(n = 0) {
  const input = Math.max(parseInt(n, 10), 0);
  
  if (input > 99 || isNaN(input)) {
    debugger;
    throw new TypeError();
  }

  return `0${input}`.slice(-2);
}

function timeDiff(start) {
  let diff = Date.now() - start;

  const [s, m, h] = [1000, 60 * 1000, 60 * 60 * 1000];
  let [second, minute, hour] = [0, 0, 0];

  if (diff >= h) {
    hour = (diff - (diff % h)) / h;
    diff = diff % h;
  }

  if (diff >= m) {
    minute = (diff - (diff % m)) / m;
    diff = diff % m;
  }

  if (diff >= s) {
    second = (diff - (diff % s)) / s;
    diff = diff % s;
  }
  return { hour, minute, second };
}

export { twoDigit, timeDiff };
