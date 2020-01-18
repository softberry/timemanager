import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Icon from "../../__ui/icon";
import Input from "../../__ui/formElements";
import { H2, H4 } from "../../__ui/headline";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

interface IWorkListItemEntry {
  //TODO: move this to interfaces.d.ts when this componenet completed
  name: string;
  labour: [{}];
  materials: [{}];
}

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

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
    value: entry.name,
  };
  return (
    <div className={styles[`WorkLogs-${theme}-EditForm`]}>
      <div className={styles[`WorkLogs-${theme}-EditForm-Name`]}>
        <Input {...nameField} />
      </div>
      <div className={styles[`WorkLogs-${theme}-EditForm-Description`]}>
        <Input name="description" value={entry.description} />
      </div>
      <div className={styles[`WorkLogs-${theme}-EditForm-Times`]}>
        <WorkListTimeEntries entries={entry} styles={styles} theme={theme} />
      </div>
      <div className={styles[`WorkLogs-${theme}-EditForm-Materials`]}>
        <WorkListWorkEntries entries={entry} styles={styles} theme={theme} />
      </div>
    </div>
  );
}

function WorkListTimeEntries({ entries, styles, theme }: any) {
  return (
    <>
      <div className={styles[`WorkLogs-${theme}-EditForm-Title`]}>
        <div>Time Logs</div>
        <div>
          <Icon>add</Icon>
        </div>
      </div>

      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
      <div>01/01/2019 - 10:30 - 03h 25m</div>
    </>
  );
}

function WorkListWorkEntries({ entries, styles, theme }: any) {
  return (
    <>
      <H4>Work Logs</H4>
      <div>Kabelbinder 3.25€ x 1 stck</div>
    </>
  );
}

export default function WorksLogs({ show, contact }: any) {
  const [workLogs, setWorkLogs] = useState({ state: "INITIAL", data: [] });

  const nSQL = useSelector((state: any) => state.db.nSQL);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

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
      <H2>
        <div>Worklog</div>
        <div onClick={addNewWork}>
          <Icon>add</Icon>
        </div>
      </H2>
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
