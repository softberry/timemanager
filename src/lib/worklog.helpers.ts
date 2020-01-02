function createWorkLog({
  nSQL,
  start,
  finish,
  description = ""
}: IWorklogInput): Promise<any> {
  return new Promise((res, rej) => {
    const startISO: Date = new Date(start);
    const endISO: Date = new Date(finish);

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
function toISO(time: Date) {
  const isoString = new Date(time).toISOString();

  return isoString;
}
function createWorkLogFromCurrentCounter(
  nSQL: any,
  id = "active-counter-0",
  description = ""
) {
  return new Promise((res, rej) => {
    nSQL("counterTable")
      .query("select")
      .where(["id", "=", id])
      .exec()
      .then((item: [{ start: Date; current: Date }]) => {
        if (item.length < 1) {
          rej({ msg: "Could not created a Timestamp for timer" });
        }
        const data = {
          nSQL,
          start: item[0].start,
          finish: item[0].current,
          description
        };
        res(createWorkLog(data));
      })
      .catch((err: Error) => rej(err));
  });
}
export { createWorkLogFromCurrentCounter };
