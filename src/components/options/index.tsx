import { ReactElement, useContext, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { RadioGroup, Radio } from "../../__ui/formElements";

import { ViewSettingsEnums, ThemeEnums } from "../../__typings/interfaces.d";

import ViewContext from "../../views";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();

stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);
const Options: FC = (): ReactElement => {
  const view = useContext(ViewContext);
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const viewClass = styles[`Options-${theme}-${view}`];
  const dispatch = useDispatch();

  const [selectedTheme, setSelectedTheme] = useState(theme);
  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "Options" });
  });

  useEffect(() => {
    dispatch({
      type: ViewSettingsEnums.UPDATE_THEME,
      design: {
        theme: selectedTheme,
      },
    });
  });

  const updateTheme = (t: string): void => {
    (t === ThemeEnums.DEFAULT_THEME || t === ThemeEnums.OCEAN_THEME) && setSelectedTheme(t);
  };
  return (
    <section className={viewClass}>
      <div>Theme</div>
      <div>
        <RadioGroup onChange={updateTheme}>
          <Radio label="Default" value={ThemeEnums.DEFAULT_THEME} checked={theme === ThemeEnums.DEFAULT_THEME} />
          <Radio label="Ocean" value={ThemeEnums.OCEAN_THEME} checked={theme === ThemeEnums.OCEAN_THEME} />
        </RadioGroup>
      </div>
    </section>
  );
};

export default Options;
