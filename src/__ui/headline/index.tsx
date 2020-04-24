import React, { FC, ReactNode } from "react";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { ThemeEnums } from "../../__typings/interfaces.d";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
export interface IHeadlineProps {
  children: ReactNode;
  /** String, DOM elements React elements those will be rendered in the headline  */
  size: 1 | 2 | 3 | 4 | 5 | 6;
}

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

/**
 * This a constructor component for all headlines 1-6. No need to use this component directly in app.
 * Use simple like this : ``<H1>text</H1> or <H2>text</H2>`` and so on.
 */
const Headline: FC<IHeadlineProps> = ({ children, size }: IHeadlineProps) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <>
      {size === 1 && <h1 className={styles[`Headline-${theme}-${size}`]}>{children}</h1>}
      {size === 2 && <h2 className={styles[`Headline-${theme}-${size}`]}>{children}</h2>}
      {size === 3 && <h3 className={styles[`Headline-${theme}-${size}`]}>{children}</h3>}
      {size === 4 && <h4 className={styles[`Headline-${theme}-${size}`]}>{children}</h4>}
      {size === 5 && <h5 className={styles[`Headline-${theme}-${size}`]}>{children}</h5>}
      {size === 6 && <h6 className={styles[`Headline-${theme}-${size}`]}>{children}</h6>}
    </>
  );
};

const H1: FC = ({ children }) => {
  return (
    <>
      <Headline size={1}>{children}</Headline>
    </>
  );
};
const H2: FC = ({ children }) => {
  return (
    <>
      <Headline size={2}>{children}</Headline>
    </>
  );
};
const H3: FC = ({ children }) => {
  return (
    <>
      <Headline size={3}>{children}</Headline>
    </>
  );
};
const H4: FC = ({ children }) => {
  return (
    <>
      <Headline size={4}>{children}</Headline>
    </>
  );
};
const H5: FC = ({ children }) => {
  return (
    <>
      <Headline size={5}>{children}</Headline>
    </>
  );
};
const H6: FC = ({ children }) => {
  return (
    <>
      <Headline size={6}>{children}</Headline>
    </>
  );
};

export { Headline as default, H1, H2, H3, H4, H5, H6 };
