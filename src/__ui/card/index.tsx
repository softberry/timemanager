import React, { useContext } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../typography";
import { VDESIGN } from "../../store/constant-enums";
import ViewContext from "../../views";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function Card({ children }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`Card-${theme}-${view}`]}>{children}</div>;
}

function CardTitle({ children }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`CardTitle-${theme}-${view}`]}>{children}</div>;
}

function CardBody({ children }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return <div className={styles[`CardBody-${theme}-${view}`]}>{children}</div>;
}

function CardFooter({ children }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return (
    <div className={styles[`CardFooter-${theme}-${view}`]}>{children}</div>
  );
}

export { Card as default, CardTitle, CardBody, CardFooter };
