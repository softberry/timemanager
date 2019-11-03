import { nSQL } from "@nano-sql/core";

function createWorkLog({ start, end, description = "" }) {
  return new Promise((res, rej) => {
    const startISO = new Date(start);
    const endISO = new Date(end);

    if (endISO <= startISO) {
      rej({ msg: "Start must be before (smaller) than stop!" });
    }

    const WorkDurationEntry = {
      timeStart: startISO,
      timeEnd: endISO,
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
          start: toISO(item[0].start),
          end: toISO(item[0].current),
          description
        };
        res(createWorkLog(data));
      })
      .catch(err => rej(err));
  });
}
export { createWorkLog, createWorkLogFromCurrentCounter };
