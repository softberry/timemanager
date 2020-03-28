import React, { useContext, FunctionComponent, ReactElement } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../typography";
import ViewContext from "../../views";
import { ThemeEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Card: FunctionComponent = ({ children }): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`Card-${theme}-${view}`]}>{children}</div>;
};

const CardTitle: FunctionComponent = ({ children }): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`CardTitle-${theme}-${view}`]}>{children}</div>;
};

const CardBody: FunctionComponent = ({ children }): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`CardBody-${theme}-${view}`]}>{children}</div>;
};

const CardFooter: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`CardFooter-${theme}-${view}`]}>{children}</div>;
};

export { Card as default, CardTitle, CardBody, CardFooter };
