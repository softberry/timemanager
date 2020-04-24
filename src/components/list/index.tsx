import React, { useContext, FC, ReactElement } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { ThemeEnums } from "../../__typings/interfaces.d";
import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const List: FC = ({ children }): ReactElement => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return (
    <>
      <section className={styles[`List-${theme}`]}>
        {children &&
          React.Children.map(children, (child, key) => (
            <div className={styles[`List-${theme}-Item-${view}`]} key={key}>
              {child}
            </div>
          ))}
      </section>
    </>
  );
};

export default List;
