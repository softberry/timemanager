import React, { useState, useContext, useEffect } from "react";

import Nav from "../components/nav";
import Footer from "../components/footer";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../__ui/typography";
import { VDESIGN } from "../store/constant-enums";

import ViewContext from "../views/index";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function DefaultLayout({ children }: any) {
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
    </section>
  );
}

export default DefaultLayout;
