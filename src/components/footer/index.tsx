import React, { FunctionComponent, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../../__ui/icon";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { IconNameEnums, ThemeEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Footer: FunctionComponent = (): ReactElement => {
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
        <Icon>{IconNameEnums.TIMER}</Icon>
        <div className={styles[`Footer-${theme}-Label`]}>Timer</div>
      </NavLink>
      <NavLink
        to="/contacts"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>{IconNameEnums.CONTACTS}</Icon>
        <div className={styles[`Footer-${theme}-Label`]}>Contacts</div>
      </NavLink>
      <NavLink
        to="/worklogs"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>{IconNameEnums.CALENDAR}</Icon>
        <div className={styles[`Footer-${theme}-Label`]}>Calendar</div>
      </NavLink>
      <NavLink
        to="/options"
        className={styles[`Footer-${theme}-Button`]}
        activeClassName={styles[`Footer-${theme}-Button-ActiveLink`]}
      >
        <Icon>{IconNameEnums.SETTINGS}</Icon>
        <div className={styles[`Footer-${theme}-Label`]}>Settings</div>
      </NavLink>
    </section>
  );
};

export default Footer;
