import React, { useContext } from "react";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";

import { DesignEnums } from "../../__typings/interfaces.d";
import ViewContext from "../../views/index";

const stylesMap = new Map();
stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);

function List({ children }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return (
    <>
      <section className={styles[`List-${theme}`]}>
        {children &&
          children.map((child: any, key: number) => (
            <div className={styles[`List-${theme}-Item-${view}`]} key={key}>
              {child}
            </div>
          ))}
      </section>
    </>
  );
}

export default List;
