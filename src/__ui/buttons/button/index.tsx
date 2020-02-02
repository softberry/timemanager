import React, { useContext } from "react";

import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

import Icon from "../../icon";
import { ESizeIcon } from "../../../__typings/interfaces.d";
import ViewContext from "../../../views";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function Button({ children, icon }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const view = useContext(ViewContext);
  return (
    <>
      <div className={styles[`Btn-${theme}-basic-${view}`]}>
        <button className={styles[`Btn-${theme}-basic-${view}`]}>
          {icon && <Icon size={ESizeIcon.SMALL}>{icon}</Icon>}
          <span>{children}</span>
        </button>
      </div>
    </>
  );
}

export default Button;
