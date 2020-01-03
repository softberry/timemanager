import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

export default function Footer() {
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });

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
        to="/contacts"
        className={styles.FooterButton}
        activeClassName={styles.FooterButtonActiveLink}
      >
        <Icon>contacts</Icon>
      </NavLink>
      <NavLink
        to="/calendar"
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
