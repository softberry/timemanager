import React from "react";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contactsList";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../index";
function ContactsView() {
  return (
    <ViewContext.Provider value={VDESIGN.DESIGN_VIEW_SECONDARY}>
      <DefaultLayout>
        <ContactsList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
}

export default ContactsView;
