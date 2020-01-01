import React from "react";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contactsList";
export default function() {
  return (
    <DefaultLayout>
      <ContactsList view="secondary" />
    </DefaultLayout>
  );
}
