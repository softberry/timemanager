
export default function timediff(start) {
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
