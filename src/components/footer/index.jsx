import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import styles from "./footer.module.scss";
export default function Footer() {
  return (
    <section className={styles.Footer}>
      <NavLink
        exact
        to="/"
        className={styles.FooterButton}
        activeClassName={styles.FooterButtonActiveLink}
      >
        <Icon>timer</Icon>
      </NavLink>
      <NavLink
        to="/customers"
        className={styles.FooterButton}
        activeClassName={styles.FooterButtonActiveLink}
      >
        <Icon>contacts</Icon>
      </NavLink>
      <NavLink
        to="/history"
        className={styles.FooterButton}
        activeClassName={styles.FooterButtonActiveLink}
      >
        <Icon>list</Icon>
      </NavLink>
      <NavLink
        to="/settings"
        className={styles.FooterButton}
        activeClassName={styles.FooterButtonActiveLink}
      >
        <Icon>settings</Icon>
      </NavLink>
    </section>
  );
}
