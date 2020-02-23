import React, { ReactElement, ReactNode } from "react";
import Button from "../../__ui/buttons/button";
import { CardFooter } from "../../__ui/card";
import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconEnums,
  SubPageViewActionTypes,
} from "../../__typings/interfaces.d";
import { useDispatch } from "react-redux";

import WorkLogsTitle from "./workLogsTitle";
import TimeLogs from "./timelogs";
import MaterialLogs from "./materiallogs";
interface IWorkLogsProps {
  children?: ReactNode;
  contactId: string;
}

const WorkLogs = ({ children, contactId }: IWorkLogsProps): ReactElement => {
  const dispatch = useDispatch();

  const createWorklogHandler = () => {
    dispatch({
      type: SubPageViewActionTypes.SHOW,
      caption: "New Worklog",
      content: (
        <>
          <WorkLogsTitle />
          <TimeLogs />
          <MaterialLogs />
          <CardFooter>
            <Button
              icon={IconEnums.CLEAR}
              isDisabled={false}
              onClick={() => {}}
              align={ButtonAlignmentEnums.LEFT}
              type={ButtonTypeEnums.WARNING}
            >
              Cancel
            </Button>
            <Button
              icon={IconEnums.ADD}
              isDisabled={false}
              onClick={() => {}}
              align={ButtonAlignmentEnums.RIGHT}
              type={ButtonTypeEnums.POISITIVE}
            >
              Save
            </Button>
          </CardFooter>
        </>
      ),
    });
  };
  return (
    <>
      <Button
        icon={IconEnums.ADD}
        isDisabled={false}
        onClick={createWorklogHandler}
        align={ButtonAlignmentEnums.CENTER}
        type={ButtonTypeEnums.SIMPLE}
      >
        Create Worklog
      </Button>

      <div>List of Works</div>
    </>
  );
};

export default WorkLogs;
// i
// mport { useSelector, useDispatch } from "react-redux";
// import Icon from "../../__ui/icon";
// import Input from "../../__ui/formElements";
// import { H2, H4 } from "../../__ui/headline";

// import themeDefault from "./theme-default.module.scss";
// import themeOcean from "./theme-ocean.module.scss";
// import { useTheme, useThemeStyle } from "../../__ui/typography";

// import {
//   IWorkListItemEntry,
//   ButtonTypeEnums,
//   ButtonAlignmentEnums,
//   IconEnums,
//   IContactsTableModel,
//   SubPageViewActionTypes,
//   //  IworkTableModel,
// } from "../../__typings/interfaces.d";
// import Button from "../../__ui/buttons/button";

// const stylesMap = new Map();
// stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
// stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

// function WorkListItem({ entry, theme, styles }: any) {
//   const { name, labour, materials }: IWorkListItemEntry = entry;
//   const [showDetails, setShowDetails] = useState(false);
//   if (typeof name === undefined) return <></>;
//   function expandCollapse() {
//     setShowDetails(!showDetails);
//   }
//   return (
//     <>
//       <div className={styles[`WorkLogs-${theme}`]}>
//         <div className={styles[`WorkLogs-${theme}-Name`]}>{name}</div>
//         <div className={styles[`WorkLogs-${theme}-Time`]}>{labour.length}</div>
//         <div className={styles[`WorkLogs-${theme}-Material`]}>
//           {materials.length}
//         </div>
//         <div
//           className={styles[`WorkLogs-${theme}-Icon`]}
//           onClick={expandCollapse}
//         >
//           <Icon>{showDetails ? IconEnums.ARROW_DOWN : IconEnums.ARROW_UP}</Icon>
//         </div>
//         {showDetails && (
//           <WorkListItemEditForm entry={entry} styles={styles} theme={theme} />
//         )}
//       </div>
//     </>
//   );
// }

// function WorkListItemEditForm({ entry, styles, theme }: any) {
//   const nameField = {
//     id: `${entry.id}-name`,
//     name: "name",
//     uniqueName: "name",
//     value: entry.name,
//     required: true,
//     validate: true,
//   };
//   return (
//     <div className={styles[`WorkLogs-${theme}-EditForm`]}>
//       <div className={styles[`WorkLogs-${theme}-EditForm-Name`]}>
//         <Input {...nameField} />
//       </div>
//       <div className={styles[`WorkLogs-${theme}-EditForm-Description`]}>
//         <Input
//           name="description"
//           uniqueName="description"
//           value={entry.description}
//           required={false}
//           validate={true}
//         />
//       </div>
//       <div className={styles[`WorkLogs-${theme}-EditForm-Times`]}>
//         <WorkListTimeEntries entries={entry} styles={styles} theme={theme} />
//       </div>
//       <div className={styles[`WorkLogs-${theme}-EditForm-Materials`]}>
//         <WorkListWorkEntries entries={entry} styles={styles} theme={theme} />
//       </div>
//     </div>
//   );
// }

// function WorkListTimeEntries({ entries, styles, theme }: any) {
//   return (
//     <>
//       <div className={styles[`WorkLogs-${theme}-EditForm-Title`]}>
//         <div>Time Logs</div>
//         <div>
//           <Icon>{IconEnums.ADD}</Icon>
//         </div>
//       </div>

//       <div>01/01/2019 - 10:30 - 03h 25m</div>
//       <div>01/01/2019 - 10:30 - 03h 25m</div>
//       <div>01/01/2019 - 10:30 - 03h 25m</div>
//     </>
//   );
// }

// function WorkListWorkEntries({ entries, styles, theme }: any) {
//   return (
//     <>
//       <H4>Work Logs</H4>
//       <div>Kabelbinder 3.25€ x 1 stck</div>
//     </>
//   );
// }

// function WorksLogs<T>(contact: IContactsTableModel) {
//   //  const [workLogs, setWorkLogs] = useState({ state: "INITIAL", data: [] });

//   // const worklogs = useSelector((state: any) => state.worklogs.worklogs);
//   // const nSQL = useSelector((state: any) => state.db.nSQL);
//   const theme = useTheme();
//   const styles = useThemeStyle(stylesMap);
//   const dispatch = useDispatch();

//   function addWorkLogFor(): void {
//     dispatch({
//       type: SubPageViewActionTypes.SHOW,
//     });
//     // nSQL("workTable")
//     //   .presetQuery("createNewWorkLogForContact", {
//     //     contactID: contact.id,
//     //   })
//     //   .exec()
//     //   .then((current: [IworkTableModel]) => {
//     //     nSQL("workTable")
//     //       .query("select")
//     //       .where(["contactID", "=", current[0].contactID])
//     //       .exec()
//     //       .then((allWorkLogs: [IworkTableModel]) => {
//     //         dispatch({
//     //           type: TYPES.WORKLOGS_UPDATE,
//     //           worklogs: allWorkLogs,
//     //         });
//     //       });
//     //   });
//   }

//   return (
//     <>
//       <H2>Worklogs</H2>

//       {[].map((entry: any, key: number) => {
//         return (
//           <></>
//           // <WorkListItem key={key} entry={entry} styles={styles} theme={theme} />
//         );
//       })}
//       <div>
//         <Button
//           icon={IconEnums.ADD}
//           align={ButtonAlignmentEnums.CENTER}
//           type={ButtonTypeEnums.POISITIVE}
//           onClick={addWorkLogFor}
//           isDisabled={false}
//         >
//           Create Worklog
//         </Button>
//       </div>
//     </>
//   );
// }

// export default WorksLogs;
