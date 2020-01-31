import React from "react";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import {
  IHeadlineBuilderProps,
  IHeadlineProps,
} from "../../__typings/interfaces";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function Headline({ children, size }: IHeadlineBuilderProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      {size === 1 && (
        <h1 className={styles[`Headline-${theme}-${size}`]}>{children}</h1>
      )}
      {size === 2 && (
        <h2 className={styles[`Headline-${theme}-${size}`]}>{children}</h2>
      )}
      {size === 3 && (
        <h3 className={styles[`Headline-${theme}-${size}`]}>{children}</h3>
      )}
      {size === 4 && (
        <h4 className={styles[`Headline-${theme}-${size}`]}>{children}</h4>
      )}
      {size === 5 && (
        <h5 className={styles[`Headline-${theme}-${size}`]}>{children}</h5>
      )}
      {size === 6 && (
        <h6 className={styles[`Headline-${theme}-${size}`]}>{children}</h6>
      )}
    </>
  );
}

function H1({ children = <></> }: IHeadlineProps) {
  return (
    <>
      <Headline size={1}>{children}</Headline>
    </>
  );
}
function H2({ children }: IHeadlineProps) {
  return (
    <>
      <Headline size={2}>{children}</Headline>
    </>
  );
}
function H3({ children }: IHeadlineProps) {
  return (
    <>
      <Headline size={3}>{children}</Headline>
    </>
  );
}
function H4({ children }: IHeadlineProps) {
  return (
    <>
      <Headline size={4}>{children}</Headline>
    </>
  );
}
function H5({ children }: IHeadlineProps) {
  return (
    <>
      <Headline size={5}>{children}</Headline>
    </>
  );
}
function H6({ children }: IHeadlineProps) {
  return (
    <>
      <Headline size={6}>{children}</Headline>
    </>
  );
}

export { Headline as default, H1, H2, H3, H4, H5, H6 };
