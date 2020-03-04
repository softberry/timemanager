import React, { ReactElement } from "react";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import {
  IHeadlineBuilderProps,
  IHeadlineProps,
  DesignEnums,
} from "../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function Headline({ children, size }: IHeadlineBuilderProps): ReactElement {
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

function H1({ children = <></> }: IHeadlineProps): ReactElement {
  return (
    <>
      <Headline size={1}>{children}</Headline>
    </>
  );
}
function H2({ children }: IHeadlineProps): ReactElement {
  return (
    <>
      <Headline size={2}>{children}</Headline>
    </>
  );
}
function H3({ children }: IHeadlineProps): ReactElement {
  return (
    <>
      <Headline size={3}>{children}</Headline>
    </>
  );
}
function H4({ children }: IHeadlineProps): ReactElement {
  return (
    <>
      <Headline size={4}>{children}</Headline>
    </>
  );
}
function H5({ children }: IHeadlineProps): ReactElement {
  return (
    <>
      <Headline size={5}>{children}</Headline>
    </>
  );
}
function H6({ children }: IHeadlineProps): ReactElement {
  return (
    <>
      <Headline size={6}>{children}</Headline>
    </>
  );
}

export { Headline as default, H1, H2, H3, H4, H5, H6 };
