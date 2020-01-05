import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@material-ui/core";
import Input from "../../__ui/formElements";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

interface IWorkListItemEntry {
  name: string;
  labour: [{}];
  materials: [{}];
}

function WorkListItem({ entry, theme, styles }: any) {
  const { name, labour, materials }: IWorkListItemEntry = entry;
  const [showDetails, setShowDetails] = useState(false);
  if (typeof name === undefined) return <></>;
  function expandCollapse() {
    setShowDetails(!showDetails);
  }
  return (
    <>
      <div className={styles[`WorkLogs-${theme}`]}>
        <div className={styles[`WorkLogs-${theme}-Name`]}>{name}</div>
        <div className={styles[`WorkLogs-${theme}-Time`]}>{labour.length}</div>
        <div className={styles[`WorkLogs-${theme}-Material`]}>
          {materials.length}
        </div>
        <div
          className={styles[`WorkLogs-${theme}-Icon`]}
          onClick={expandCollapse}
        >
          <Icon>
            {showDetails ? "keyboard_arrow_down" : "keyboard_arrow_up"}
          </Icon>
        </div>
        {showDetails && (
          <WorkListItemEditForm entry={entry} styles={styles} theme={theme} />
        )}
      </div>
    </>
  );
}

function WorkListItemEditForm({ entry, styles, theme }: any) {
  const nameField = {
    id: `${entry.id}-name`,
    name: "name",
    value: entry.name
  };
  return (
    <div className={styles[`WorkLogs-${theme}-EditForm`]}>
      <div className={styles[`WorkLogs-${theme}-EditFormName`]}>
        <Input {...nameField} />
      </div>
      <div className={styles[`WorkLogs-${theme}-EditFormDescription`]}>
        <Input
          id={`${entry.id}-description`}
          name="description"
          value={entry.description}
        />
      </div>
      <div className={styles[`WorkLogs-${theme}-EditFormTimes`]}>
        <WorkListTimeEntries entries={entry} />
      </div>
      <div className={styles[`WorkLogs-${theme}-EditFormMaterials`]}>
        <WorkListWorkEntries entries={entry} styles={styles} theme={theme} />
      </div>
    </div>
  );
}

function WorkListTimeEntries({ entries, styles, theme }: any) {
  return (
    <>
      <div className={styles[`WorkLogs-${theme}-EditFormTitle`]}>
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

function WorkListWorkEntries({ entries, styles, theme }: any) {
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
  let theme = VDESIGN.DESIGN_THEME_DEFAULT;
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });

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
      .then((logs: []) => {
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
      <h2 className={styles[`WorkLogsTitle-${theme}`]}>
        <div>Worklog</div>
        <div onClick={addNewWork}>
          <Icon>add</Icon>
        </div>
      </h2>
      {workLogs.data.length > 0 && (
        <>
          {workLogs.data.map((entry, key) => {
            return (
              <WorkListItem
                key={key}
                entry={entry}
                styles={styles}
                theme={theme}
              />
            );
          })}
        </>
      )}
    </>
  ) : (
    <></>
  );
}
