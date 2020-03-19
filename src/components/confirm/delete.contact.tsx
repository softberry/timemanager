import React, {
  useState,
  useEffect,
  ReactElement,
  FunctionComponent,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import {
  IConfirmDeleteContact,
  IContactsTableModel,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  ThemeEnums,
  IDatabaseReducer,
  IDialogActionEnums,
  IconNameEnums,
} from "../../__typings/interfaces.d";
import { Checkbox } from "../../__ui/formElements";
import Button from "../../__ui/buttons/button";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const ConfirmDeleteContactBody: FunctionComponent<IConfirmDeleteContact> = ({
  contact,
}) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  return (
    <>
      <div className={styles[`Content-${theme}`]}>
        Are you sure to delete&nbsp;
        <strong>
          {contact.name} {contact.surname}
        </strong>
        ?
      </div>
    </>
  );
};

const ConfirmDeleteContactFooter: FunctionComponent<IConfirmDeleteContact> = ({
  contact,
  dialogId,
}): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);
  const [worklogsCount, setWorklogsCount] = useState(-1);
  const [deleteWorklogsToo, setDeleteWorklogsToo] = useState(false);
  function checkBoxOnChangeHandler(checked = false): void {
    setDeleteWorklogsToo(checked);
  }

  function onDeleteButtonSubmit(id: string): void {
    if (deleteWorklogsToo) {
      nSQL("workTable")
        .query("delete")
        .where(["contactID", "=", id])
        .exec()
        .then(() => {
          console.log("Worklogs of Contact deleted!");
        });
    } else {
      nSQL("workTable")
        .query("select")
        .where(["contactID", "=", id])
        .exec()
        .then((selectedItems: [IContactsTableModel]) => {
          selectedItems.forEach(item => {
            nSQL("workTable")
              .query("upsert", {
                contactID: "__DELETED_CONTACT__",
              })
              .where(["id", "=", item.id])
              .exec()
              .then(() => {
                console.log(
                  "contactID removed from Work logs of deleted contact!"
                );
              });
          });
        });
    }

    nSQL("contactsTable")
      .query("delete")
      .where(["id", "=", id])
      .exec()
      .then(() => {
        history.push("/contacts");
      })
      .catch((err: Error) => {
        console.log("Contact deleted!");
      });
    dispatch({
      type: IDialogActionEnums.CLOSE,
      message: { dialogId: dialogId },
    });
  }

  nSQL("workTable")
    .presetQuery("getWorkLogsOfContact", { contactID: contact.id })
    .exec()
    .then((logs: []) => {
      setWorklogsCount(logs.length);
    });

  useEffect(() => {
    if (worklogsCount < 0) return;
  }, [worklogsCount, nSQL]);

  return (
    <>
      {worklogsCount > 0 && (
        <div className={styles[`Content-${theme}`]}>
          <Checkbox
            onChange={checkBoxOnChangeHandler}
            label={`Delete also ${worklogsCount} of saved works.`}
          ></Checkbox>
        </div>
      )}

      <Button
        icon={IconNameEnums.CLEAR}
        type={ButtonTypeEnums.WARNING}
        align={ButtonAlignmentEnums.RIGHT}
        onClick={onDeleteButtonSubmit.bind({}, contact.id)}
        isDisabled={false}
      >
        Delete
      </Button>
    </>
  );
};
export { ConfirmDeleteContactBody as default, ConfirmDeleteContactFooter };
