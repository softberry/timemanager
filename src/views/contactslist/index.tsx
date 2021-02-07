import { FC } from "react";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contactsList";
import ViewContext from "../index";
import { ViewEnums } from "../../__typings/interfaces.d";
const ContactsView: FC = () => {
  return (
    <ViewContext.Provider value={ViewEnums.SECONDARY_VIEW}>
      <DefaultLayout>
        <ContactsList />
      </DefaultLayout>
    </ViewContext.Provider>
  );
};

export default ContactsView;
