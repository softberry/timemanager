import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@material-ui/core";
import Input from "../../__ui/formElements";
import styles from "./worklog.module.scss";

interface IWorkListItemEntry {
  name: string;
  labour: [{}];
  materials: [{}];
}

function WorkListItem({ entry }: any) {
  const { name, labour, materials }: IWorkListItemEntry = entry;
  const [showDetails, setShowDetails] = useState(false);
  if (typeof name === undefined) return <></>;
  function expandCollapse() {
    setShowDetails(!showDetails);
  }
  return (
    <>
      <div className={styles.WorkLogs}>
        <div className={styles.WorkLogsName}>{name}</div>
        <div className={styles.WorkLogsTime}>{labour.length}</div>
        <div className={styles.WorkLogsMaterial}>{materials.length}</div>
        <div className={styles.WorkLogsIcon} onClick={expandCollapse}>
          <Icon>
            {showDetails ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          </Icon>
        </div>
        {showDetails && <WorkListItemEditForm entry={entry} />}
      </div>
    </>
  );
}

function WorkListItemEditForm({ entry }: any) {
  const nameField = {
    id: `${entry.id}-name`,
    name: "name",
    value: entry.name
  };
  return (
    <div className={styles.WorkLogsEditForm}>
      <div className={styles.WorkLogsEditFormName}>
        <Input {...nameField} />
      </div>
      <div className={styles.WorkLogsEditFormDescription}>
        <Input
          id={`${entry.id}-description`}
          name="description"
          value={entry.description}
        />
      </div>
      <div className={styles.WorkLogsEditFormTimes}>
        <WorkListTimeEntries entries={entry} />
      </div>
      <div className={styles.WorkLogsEditFormMaterials}>
        <WorkListWorkEntries entries={entry} />
      </div>
    </div>
  );
}

function WorkListTimeEntries({ entries }: any) {
  return (
    <>
      <div className={styles.WorkLogsEditFormTitle}>
        <div>Time Logs</div>
        <div>
          <Icon>add</Icon>
        </div>
      </div>

      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <input type="datetime-local" className="abcd" />
    </>
  );
}

function WorkListWorkEntries({ entries }: any) {
  return (
    <>
      <h4>Work Logs</h4>
      <div>Kabelbinder 3.25€ x 1 stck</div>
    </>
  );
}

export default function WorksLogs({ show, contact }: any) {
  const [workLogs, setWorkLogs] = useState({ state: "INITIAL", data: [] });

  const nSQL = useSelector((state: any) => state.db.nSQL);

  useEffect(() => {
    if (typeof nSQL !== "function") return;
  }, [nSQL]);

  useEffect(() => {
    if (contact.id === null) return;
    if (workLogs.state === "ACTIVE" || workLogs.state === "READY") return;
    setWorkLogs({ ...workLogs, state: "ACTIVE" });
    nSQL("workTable")
      .presetQuery("getWorkLogsOfContact", { contactID: contact.id })
      .exec()
      .then((logs:[]) => {
        setWorkLogs({ ...workLogs, state: "READY", data: logs });
      });
  }, [workLogs, contact, nSQL]);

  function addNewWork() {
    nSQL("workTable")
      .presetQuery("createNewWorkLogForContact", { contactID: contact.id })
      .exec()
      .then((logs: []) => {
        setWorkLogs({ ...workLogs, state: "NEWDATA", data: logs });
      });
  }

  useEffect(() => {
    if (!show) return;
  }, [show]);

  return show ? (
    <>
      <hr />
      <h2 className={styles.WorkLogsTitle}>
        <div>Worklog</div>
        <div onClick={addNewWork}>
          <Icon>add</Icon>
        </div>
      </h2>
      {workLogs.data.length > 0 && (
        <>
          {workLogs.data.map((entry, key) => {
            return <WorkListItem key={key} entry={entry} />;
          })}
        </>
      )}
    </>
  ) : (
    <></>
  );
}
