import React from "react";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contactsList";
import { VDESIGN } from "../../store/constant-enums";
export default function() {
  return (
    <DefaultLayout>
      <ContactsList view={VDESIGN.DESIGN_VIEW_SECONDARY} />
    </DefaultLayout>
  );
}
