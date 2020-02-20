import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../__ui/icon";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { IconEnums, DesignEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

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
        <Icon>{IconEnums.TIMER}</Icon>
      </NavLink>
      <NavLink
        to="/contacts"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>{IconEnums.CONTACTS}</Icon>
      </NavLink>
      <NavLink
        to="/worklogs"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>{IconEnums.CALENDAR}</Icon>
      </NavLink>
      <NavLink
        to="/settings"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>{IconEnums.SETTINGS}</Icon>
      </NavLink>
    </section>
  );
}

export default Footer;
