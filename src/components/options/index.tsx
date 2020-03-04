import React, {
  ReactElement,
  useContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { RadioGroup, Radio } from "../../__ui/formElements";

import {
  IDesign,
  ViewSettingsEnums,
  DesignEnums,
  IViewStateReducer,
} from "../../__typings/interfaces.d";

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

  const currentTheme = useSelector(
    ({ design }: IViewStateReducer) => design.theme
  );
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  useEffect(() => {
    dispatch({ type: ViewSettingsEnums.UPDATE_TITLE, title: "Options" });
  });

  useEffect(() => {
    dispatch({
      type: IDesign.THEME,
      theme: selectedTheme,
    });
  }, [dispatch, selectedTheme]);

  return (
    <section className={viewClass}>
      <div>Theme</div>
      <div>
        <RadioGroup onChange={setSelectedTheme}>
          <Radio
            label="Default"
            value={DesignEnums.DEFAULT_THEME}
            checked={currentTheme === DesignEnums.DEFAULT_THEME}
          />
          <Radio
            label="Ocean"
            value={DesignEnums.OCEAN_THEME}
            checked={currentTheme === DesignEnums.OCEAN_THEME}
          />
        </RadioGroup>
      </div>
    </section>
  );
};

export default Options;
