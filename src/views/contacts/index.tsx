import React from "react";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contactsList";
import { DESIGN } from "../../store/action-types";
export default function() {
  return (
    <DefaultLayout>
      <ContactsList view={DESIGN.DESIGN_VIEW_SECONDARY} />
    </DefaultLayout>
  );
}
