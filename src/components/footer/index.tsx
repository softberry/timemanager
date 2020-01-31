import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../__ui/icon";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function Footer() {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

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
        <Icon>date_range</Icon>
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

export default Footer;
