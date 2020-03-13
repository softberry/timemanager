import React, {
  useState,
  useContext,
  useEffect,
  FunctionComponent,
} from "react";

import Nav from "../components/nav";
import Footer from "../components/footer";

import SubPageView from "../components/subPageView";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../__ui/typography";

import ViewContext from "../views/index";
import { ThemeEnums } from "../__typings/interfaces.d";

const stylesMap = new Map();
stylesMap.set(ThemeEnums.OCEAN_THEME, themeOcean);
stylesMap.set(ThemeEnums.DEFAULT_THEME, themeDefault);

const DefaultLayout: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);
  const [slideIn, setSlideIn] = useState(false);
  const view = useContext(ViewContext);

  useEffect(() => {
    if (slideIn === true) return;
    setTimeout(() => {
      setSlideIn(true);
    }, 100);
  }, [slideIn]);
  return (
    <section className={styles[`Layout-${theme}-${view}`]}>
      <Nav />
      <main className={styles[`Main-${theme}`]} data-slide-in={slideIn}>
        {children}
      </main>
      <Footer />
      <SubPageView />
    </section>
  );
};

export default DefaultLayout;
