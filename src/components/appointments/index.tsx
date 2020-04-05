import React, { useContext, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../__ui/buttons/button";

import ViewContext from "../../views/index";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import {
  IconNameEnums,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  ViewSettingsEnums,
  ThemeEnums,
  IDatabaseReducer,
  IAppointmentsTableModel,
  SubPageActionEnums,
  ISubPageState,
} from "../../__typings/interfaces.d";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import Card, { CardBody } from "../../__ui/card";
import Icon from "../../__ui/icon";
import EditAppointment from "../../subViews/editAppointments";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

function Appointments(): ReactElement {
  const dispatch = useDispatch();
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const nSQL = useSelector((state: IDatabaseReducer) => state.db.action.nSQL);

  const [allAppointments, setAllAppointments] = useState<IAppointmentsTableModel[]>([]);
  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "Appointments" });
  });

  function createNewWorklogHandler(): void {
    console.log("Craete New Appointment : placeholder");
    const subPage: ISubPageState = {
      type: SubPageActionEnums.SHOW,
      action: {
        caption: "New Appointment",
        content: (
          <>
            <EditAppointment />
          </>
        ),
      },
    };
    dispatch(subPage);
  }

  useEffect(() => {
    nSQL("workDurationTable")
      .query("select")
      .orderBy(["start ASC"])
      .exec()
      .then((list: [IAppointmentsTableModel]) => {
        setAllAppointments(list);
      });
  }, [nSQL]);

  return (
    <div className={styles[`Appointments-${theme}-${view}`]}>
      <div className={styles[`Appointments-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconNameEnums.ADD}
          align={ButtonAlignmentEnums.STRETCH}
          isDisabled={false}
          onClick={createNewWorklogHandler}
          type={ButtonTypeEnums.POSITIVE}
        >
          Create Appointment
        </Button>
      </div>
      <div>
        <Card>
          <CardBody>
            <div className={styles[`Appointments-${theme}-${view}-Content`]}>
              <div className={styles[`Appointments-${theme}-${view}-Type`]}>
                <Icon>{IconNameEnums.BOOKMARK}</Icon>
              </div>
              Contact <br />
              From: 01.01.2020 12:00 <br />
              Duration : 1 Hour <br />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className={styles[`Appointments-${theme}-${view}-Content`]}>
              <div className={styles[`Appointments-${theme}-${view}-Type`]}>
                <Icon>{IconNameEnums.BOOKMARK_BORDER}</Icon>
              </div>
              Contact <br />
              From: 01.01.2020 12:00 <br />
              Duration : 1 Hour <br />
              Appointment
            </div>
          </CardBody>
        </Card>
        {allAppointments.map(log => (
          <Card>
            <CardBody>
              <div className={styles[`Appointments-${theme}-${view}-Content`]}>
                <div className={styles[`Appointments-${theme}-${view}-Type`]}>
                  <Icon>{IconNameEnums.BOOKMARK_BORDER}</Icon>
                </div>
                Contact <br />
                From: {log.start} <br />
                Duration : {log.finish} <br />
                Appointment
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
