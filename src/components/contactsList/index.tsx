import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import List from "../list";
import Button from "../../__ui/buttons/button";
import TYPES from "../../store/action-types";
import { VDESIGN } from "../../store/constant-enums";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import {
  IContactsTableModel,
  ButtonAlignmentEnums,
  ButtonTypeEnums,
  IconEnums,
} from "../../__typings/interfaces.d";

import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function ContactsList() {
  const view = useContext(ViewContext);
  const nSQL = useSelector((state: any) => state.db.nSQL);
  const [ready, setReady] = useState(false);
  const [contacts, setContacts] = useState<IContactsTableModel[]>([]);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const dispatch = useDispatch();
  const history = useHistory();
  const createContactClickHandler = () => {
    nSQL("contactsTable")
      .presetQuery("createNewEmptyUserEntryForEdit")
      .exec()
      .then((row: []) => {
        history.push("/contact/edit/new-contact-to-edit");
      });
  };
  useEffect(() => {
    if (typeof nSQL !== "function") return;

    nSQL("contactsTable")
      .query("select")
      .where(["id", "!=", "new-contact-to-edit"])
      .orderBy(["name ASC", "surname ASC"])
      .exec()
      .then((list: [IContactsTableModel]) => {
        setContacts(list);
        setReady(true);
      });
  }, [nSQL]);

  useEffect(() => {
    if (!ready) return;
  }, [ready]);

  dispatch({ type: TYPES.TOOLBAR_CONTACTS });
  dispatch({ type: TYPES.VIEWSETTINGS.UPDATE_TITLE, title: "Contacts" });

  return (
    <div className={styles[`Contacts-${theme}-${view}`]}>
      <div className={styles[`Contacts-${theme}-${view}-Create-New`]}>
        <Button
          icon={IconEnums.ADD}
          align={ButtonAlignmentEnums.RIGHT}
          isDisabled={false}
          onClick={createContactClickHandler}
          type={ButtonTypeEnums.POISITIVE}
        >
          Create Contact
        </Button>
      </div>

      <List title="Contacts" list={contacts} type="CONTACTS_LIST" view={view} />
    </div>
  );
}
export default ContactsList;
