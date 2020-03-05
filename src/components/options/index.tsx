import React, {
  ReactElement,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { RadioGroup, Radio } from "../../__ui/formElements";

import { ViewSettingsEnums, DesignEnums } from "../../__typings/interfaces.d";

import ViewContext from "../../views";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";

const stylesMap = new Map();

stylesMap.set(DesignEnums.OCEAN_THEME, themeOcean);
stylesMap.set(DesignEnums.DEFAULT_THEME, themeDefault);
const Options: FunctionComponent = (): ReactElement => {
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
      theme: selectedTheme,
    });
  });

  const updateTheme = (t: DesignEnums): void => {
    (t === DesignEnums.DEFAULT_THEME || t === DesignEnums.OCEAN_THEME) &&
      setSelectedTheme(t);
  };
  return (
    <section className={viewClass}>
      <div>Theme</div>
      <div>
        <RadioGroup onChange={updateTheme}>
          <Radio
            label="Default"
            value={DesignEnums.DEFAULT_THEME}
            checked={theme === DesignEnums.DEFAULT_THEME}
          />
          <Radio
            label="Ocean"
            value={DesignEnums.OCEAN_THEME}
            checked={theme === DesignEnums.OCEAN_THEME}
          />
        </RadioGroup>
      </div>
    </section>
  );
};

export default Options;
