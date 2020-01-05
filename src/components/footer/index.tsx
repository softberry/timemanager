import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

export default function Footer() {
  let theme = VDESIGN.DESIGN_THEME_DEFAULT;

  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });

  return (
    <section className={styles[`Footer-${theme}`]}>
      <NavLink
        exact
        to="/"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>timer</Icon>
      </NavLink>
      <NavLink
        to="/contacts"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>contacts</Icon>
      </NavLink>
      <NavLink
        to="/calendar"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>list</Icon>
      </NavLink>
      <NavLink
        to="/settings"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>settings</Icon>
      </NavLink>
    </section>
  );
}
