import React from "react";
import styles from "./default.module.scss";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function DefaultLayout({ children }) {

  return (
    <section className={styles.Layout}>
      <Nav />
      <main className={styles.Main}>{children}</main>
      <Footer />
    </section>
  );
}
