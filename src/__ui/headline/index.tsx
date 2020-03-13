import React, { FunctionComponent } from "react";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import {
  IHeadlineBuilderProps,
  ThemeEnums,
} from "../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Headline: FunctionComponent<IHeadlineBuilderProps> = ({
  children,
  size,
}) => {
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
};

const H1: FunctionComponent = ({ children = <></> }) => {
  return (
    <>
      <Headline size={1}>{children}</Headline>
    </>
  );
};
const H2: FunctionComponent = ({ children }) => {
  return (
    <>
      <Headline size={2}>{children}</Headline>
    </>
  );
};
const H3: FunctionComponent = ({ children }) => {
  return (
    <>
      <Headline size={3}>{children}</Headline>
    </>
  );
};
const H4: FunctionComponent = ({ children }) => {
  return (
    <>
      <Headline size={4}>{children}</Headline>
    </>
  );
};
const H5: FunctionComponent = ({ children }) => {
  return (
    <>
      <Headline size={5}>{children}</Headline>
    </>
  );
};
const H6: FunctionComponent = ({ children }) => {
  return (
    <>
      <Headline size={6}>{children}</Headline>
    </>
  );
};

export { Headline as default, H1, H2, H3, H4, H5, H6 };
