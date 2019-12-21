import React from "react";
import styles from "./contacts.module.scss";
import DefaultLayout from "../../layout/layout.default";
import ContactsList from "../../components/contacts";
export default function Contacts() {
  return (
    <DefaultLayout>
      <div className={styles.Contacts}>
        <ContactsList />
      </div>
    </DefaultLayout>
  );
}
