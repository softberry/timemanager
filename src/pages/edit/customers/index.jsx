import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import Input from "../../../__ui/input";

import styles from "./customer.module.scss";
import { nSQL } from "@nano-sql/core";

function ReadOnlyDeatils({ customer }) {
  const { street, zip, city, tel, mobile } = customer;
  return (
    <div className={styles.ReadOnly}>
      <div>
        {street}, {zip} - {city}{" "}
      </div>
      <div>{tel}</div>
      <div>{mobile}</div>
    </div>
  );
}

function EditableList({ customer }) {
  const nonRenderedItems = ["id", "works"];
  return (
    <div>
      {Object.keys(customer).map((item, key) => {
        const field = {
          id: `${customer.id}-${item}`,
          name: item,
          value: customer[item]
        };
        if (nonRenderedItems.includes(item)) {
          return false;
        }
        return (
          <div key={key}>
            <Input {...field} />
          </div>
        );
      })}
    </div>
  );
}

function WorkListItem({ entry }) {
  const { name, labour, materials } = entry;
  const [showDetails, setShowDetails] = useState(false);
  if (typeof name === "undefined") return <></>;
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

function WorksList({ works }) {
  return (
    <>
      {works.length > 0 && (
        <>
          {works.map((entry, key) => {
            return <WorkListItem key={key} entry={entry} />;
          })}
        </>
      )}
    </>
  );
}

function WorkListItemEditForm({ entry }) {
  console.log(entry);
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

function WorkListTimeEntries({ entries }) {
  return (
    <>
      <h4>
        Time Logs
        <Icon>add</Icon>
      </h4>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <input type="datetime-local" className="abcd" />
    </>
  );
}

function WorkListWorkEntries({ entries }) {
  return (
    <>
      <h4>Work Logs</h4>
      <div>Kabelbinder 3.25€ x 1 stck</div>
    </>
  );
}

export default function CustomerDetails({ customer }) {
  const [locked, setLocked] = useState(true);
  const [workLogs, setWorkLogs] = useState({ state: "INITIAL", data: [] });

  const [fullName, setFullName] = useState(
    `${customer.name} ${customer.surname}`
  );

  function toggleLock() {
    setLocked(!locked);
  }

  function addNewWork() {
    nSQL("workTable")
      .presetQuery("createNewWorkLogForCustomer", { customerID: customer.id })
      .exec()
      .then(logs => {
        setWorkLogs({ ...workLogs, state: "NEWDATA", data: logs });
      });
  }
  useEffect(() => {
    if (customer.id === null) return;
    if (fullName.length > 10) {
      const shortName = `${customer.name}`.slice(0, 1);
      setFullName(`${shortName}. ${customer.surname}`);
    }
  }, [setFullName, fullName, customer]);

  useEffect(() => {
    if (customer.id === null) return;
    if (workLogs.state === "ACTIVE" || workLogs.state === "READY") return;
    setWorkLogs({ ...workLogs, state: "ACTIVE" });
    nSQL("workTable")
      .presetQuery("getWorkLogsOfCustomer", { customerID: customer.id })
      .exec()
      .then(logs => {
        setWorkLogs({ ...workLogs, state: "READY", data: logs });
      });
  }, [workLogs, customer]);
  return (
    <>
      <h1 className={styles.Title}>
        <Icon onClick={toggleLock} className={styles.TitleIcon}>
          {locked ? "lock" : "lock_open"}
        </Icon>
        <div className={styles.FullName}>{fullName}</div>
      </h1>
      {locked && <ReadOnlyDeatils customer={customer} />}
      {!locked && <EditableList customer={customer} />}
      <h2 className={styles.WorkLogsTitle}>
        <div>Worklog</div>
        <div onClick={addNewWork}>
          <Icon>add</Icon>
        </div>
      </h2>
      {workLogs.state === "READY" && (
        <WorksList works={workLogs.data} addNew={addNewWork} />
      )}
    </>
  );
}
