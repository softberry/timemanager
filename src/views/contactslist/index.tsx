import React from "react";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contactsList";
import ViewContext from "../index";
import { DesignEnums } from "../../__typings/interfaces.d";
function ContactsView() {
  return (
    <ViewContext.Provider value={DesignEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <ContactsList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default ContactsView;
