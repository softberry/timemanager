import { nSQL } from "@nano-sql/core";

function createWorkLog({ start, finish, description = "" }) {
  return new Promise((res, rej) => {
    const startISO = new Date(start);
    const endISO = new Date(finish);

    if (endISO <= startISO) {
      rej({ msg: "Start must be before (smaller) than stop!" });
    }

    const WorkDurationEntry = {
      start: toISO(startISO),
      finish: toISO(endISO),
      description
    };
    res(
      nSQL("workDurationTable")
        .query("upsert", WorkDurationEntry)
        .exec()
    );
  });
}
function toISO(time) {
  const isoString = new Date(time).toISOString();

  return isoString;
}
function createWorkLogFromCurrentCounter(
  id = "active-counter-0",
  description = ""
) {
  return new Promise((res, rej) => {
    nSQL("counters")
      .query("select")
      .where(["id", "=", id])
      .exec()
      .then(item => {
        const data = {
          start: item[0].start,
          finish: item[0].current,
          description
        };
        res(createWorkLog(data));
      })
      .catch(err => rej(err));
  });
}
export { createWorkLog, createWorkLogFromCurrentCounter };
