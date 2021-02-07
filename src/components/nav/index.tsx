import { FC, useState, useEffect } from "react";
import AutoComplete from "../../__ui/autocomplete";

import ViewTitle from "../viewTitle";
import Icon from "../../__ui/icon";
import { useHistory } from "react-router-dom";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { IconNameEnums, ThemeEnums } from "../../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const Nav: FC = () => {
  const history = useHistory();
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [backDisabled, setBackDisabled] = useState(true);
  const [forwardDisabled, setForwardDisabled] = useState(true);

  useEffect(() => {
    const h = Object.assign({ index: 0 }, history);
    const isForwardDisabled = !!(h.index + 1 >= h.length);
    const isBackDisabled = h.index === 0;

    if (isForwardDisabled !== forwardDisabled) {
      setForwardDisabled(isForwardDisabled);
    }
    if (isBackDisabled !== backDisabled) {
      setBackDisabled(isBackDisabled);
    }
  }, [forwardDisabled, backDisabled, history]);

  return (
    <>
      <nav className={styles[`Nav-${theme}`]}>
        <div className={styles[`HistoryNav-${theme}`]}>
          <div className={styles[`HistoryNav-${theme}-Arrow`]} data-disabled={backDisabled}>
            <Icon onClick={history.goBack}>{IconNameEnums.ARROW_BACK}</Icon>
          </div>
          <div className={styles[`HistoryNav-${theme}-Arrow`]} data-disabled={forwardDisabled}>
            <Icon onClick={history.goForward}>{IconNameEnums.ARROW_FORWARD}</Icon>
          </div>
        </div>
        <div className={styles[`NavTitle-${theme}`]}>
          <ViewTitle />
        </div>
        <div className={styles[`SearchNav-${theme}`]}>
          <AutoComplete />
        </div>
      </nav>
    </>
  );
};

export default Nav;
