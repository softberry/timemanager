import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Input from "../../../__ui/input";

import styles from "./contacts.module.scss";
import { nSQL } from "@nano-sql/core";

function ReadOnlyDeatils({ contact }) {
  const { street, zip, city, tel, mobile } = contact;
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

function UpdateOnEdit({ item, contact }) {
  // const [itemValue, setItemValue] = useState(contact[item]);

  const field = {
    id: `${contact.id}-${item}`,
    name: item,
    value: contact[item]
  };
  return (
    <>
      <Input {...field} />
    </>
  );
}

function EditableList({ contact }) {
  const nonRenderedItems = ["id", "works"];

  return (
    <div>
      {Object.keys(contact).map((item, key) => {
        const props = { item, contact };
        return (
          <div key={key}>
            {!nonRenderedItems.includes(item) && <UpdateOnEdit {...props} />}
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

function WorkListWorkEntries({ entries }) {
  return (
    <>
      <h4>Work Logs</h4>
      <div>Kabelbinder 3.25€ x 1 stck</div>
    </>
  );
}

function ContactDetails(props) {
  
  const { contact } = props;
  const history = useHistory();

  const [locked, setLocked] = useState(true);
  const [workLogs, setWorkLogs] = useState({ state: "INITIAL", data: [] });

  const [fullName, setFullName] = useState(
    `${contact.name} ${contact.surname}`
  );


  function toggleLock() {
    setLocked(!locked);
  }

  function addNewWork() {
    nSQL("workTable")
      .presetQuery("createNewWorkLogForContact", { contactID: contact.id })
      .exec()
      .then(logs => {
        setWorkLogs({ ...workLogs, state: "NEWDATA", data: logs });
      });
  }
  useEffect(() => {
    if (contact.id === null) return;
    if (contact.id === "new-contact-to-edit") {
      setLocked(false);
      
      history.location.state.toolbar = [
        {
          type: "save",
          disabled: true,
          hidden: false,
          to: "/save/contact/new-contact-to-edit"
        }
      ];
    }
    if (fullName.length > 10) {
      const shortName = `${contact.name}`.slice(0, 1);
      setFullName(`${shortName}. ${contact.surname}`);
    }
  }, [
    setFullName,
    fullName,
    contact,
    history.location.state.toolbar,
    history.location.pathname
  ]);

  useEffect(() => {
    if (contact.id === null) return;
    if (workLogs.state === "ACTIVE" || workLogs.state === "READY") return;
    setWorkLogs({ ...workLogs, state: "ACTIVE" });
    nSQL("workTable")
      .presetQuery("getWorkLogsOfContact", { contactID: contact.id })
      .exec()
      .then(logs => {
        setWorkLogs({ ...workLogs, state: "READY", data: logs });
      });
  }, [workLogs, contact]);
  return (
    <>
      <h1 className={styles.Title}>
        <Icon onClick={toggleLock} className={styles.TitleIcon}>
          {locked ? "lock" : "lock_open"}
        </Icon>
        <div className={styles.FullName}>{fullName}</div>
      </h1>
      {locked && <ReadOnlyDeatils contact={contact} />}
      {!locked && <EditableList contact={contact} />}
      <hr />
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
export default withRouter(ContactDetails);
//TODO: 1- mail, phone etc. array type values should create inputs accordingly
//TODO: 2- Edit form should have reset/revert/cancel options beside save option
//TODO: 3- Add/Save/edit/cancel etc. buttons are generic and can be applied to all views.
//          So place such buttons in to the toolbar and
//          show/hide - enable/disable buttons according to state/route
