import React, { useState } from "react";

import Icon from "../../../__ui/icon";
import { VDESIGN } from "../../../store/constant-enums";
import { useTheme, useThemeStyle } from "../../typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);
//TODO: move interface to _typings
interface IOptionsButtonProps {
  /** Action */
  onClick: () => any;
  children?: any;
}

/**
 * Special button, which can show drop-down like list on click.
 */
function OptionsButton({ onClick, children }: IOptionsButtonProps) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [show, setShow] = useState<boolean>(false);
  function handleClick() {
    setShow(!show);
  }
  return (
    <div
      className={styles[`Options-${theme}`]}
      data-show={show ? "true" : "false"}
    >
      <div className={styles[`Options-Button-${theme}`]} onClick={handleClick}>
        {!show && <Icon>more_horiz</Icon>}
        {show && <Icon>close</Icon>}
      </div>
      <div className={styles[`Options-Content-${theme}`]}>
        {show && children}
      </div>
    </div>
  );
}

export default OptionsButton;
