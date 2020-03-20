import React, { useState, useEffect, useContext, ReactElement, ReactFragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import List from "../list";
import Button from "../../__ui/buttons/button";
import Badge from "../../__ui/badge";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import {
  IContactsTableModel,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IconNameEnums,
  NewEntryEnums,
  ViewSettingsEnums,
  ThemeEnums,
  IDatabaseReducer,
  IWorklogBadgeProp,
} from "../../__typings/interfaces.d";

import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const ContactsList = (): ReactElement => {
  const view = useContext(ViewContext);
  const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);

  const [contacts, setContacts] = useState<IContactsTableModel[]>([]);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const dispatch = useDispatch();
  const history = useHistory();

  const WorkLogBadgeFromID = ({ contactID }: IWorklogBadgeProp): ReactElement => {
    const [queried, setQueried] = useState(false);
    const [count, setCount] = useState(0);
    const nSQL = useSelector(({ db }: IDatabaseReducer) => db.action.nSQL);

    useEffect(() => {
      if (typeof nSQL !== "function" || queried) return;
      setQueried(true);
      nSQL("workTable")
        .presetQuery("getWorkLogsOfContact", { contactID })
        .exec()
        .then((logs: []) => {
          setCount(logs.length);
        });
    }, [nSQL, contactID, queried]);
    useEffect(() => {
      if (count === 0) return;
    }, [count]);

    return <>{count > 0 && <Badge content={count} view={view} />}</>;
  };

  const createContactClickHandler = (): void => {
    nSQL("contactsTable")
      .presetQuery("createNewEmptyUserEntryForEdit")
      .exec()
      .then((row: []) => {
        history.push(`/contact/edit/${NewEntryEnums.NEW_CONTACT_ID}`);
      });
  };
  useEffect(() => {
    nSQL("contactsTable")
      .query("select")
      .where(["id", "!=", NewEntryEnums.NEW_CONTACT_ID])
      .orderBy(["name ASC", "surname ASC"])
      .exec()
      .then((list: [IContactsTableModel]) => {
        setContacts(list);
      });
  }, [nSQL]);

  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "Contacts" });
  });

  return (
    <div className={styles[`Contacts-${theme}-${view}`]}>
      <div className={styles[`Contacts-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconNameEnums.ADD}
          align={ButtonAlignmentEnums.RIGHT}
          isDisabled={false}
          onClick={createContactClickHandler}
          type={ButtonTypeEnums.POISITIVE}
        >
          Create Contact
        </Button>
      </div>
      <List>
        {contacts.map(
          (item: IContactsTableModel, key: number): ReactFragment => (
            <Link to={`/contact/details/${item.id}`} key={key} className={styles[`Contacts-${theme}-${view}-Entry`]}>
              <div className={styles[`Contacts-${theme}-${view}-Entry-Item`]}>
                {item.name} {item.surname}
              </div>
              <div className={styles[`Contacts-${theme}-${view}-Entry-Badge`]}>
                <WorkLogBadgeFromID contactID={item.id} />
              </div>
            </Link>
          )
        )}
      </List>
    </div>
  );
};
export default ContactsList;
