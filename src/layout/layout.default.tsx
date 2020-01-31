import React from "react";

import Nav from "../components/nav";
import Footer from "../components/footer";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../__ui/typography";
import { VDESIGN } from "../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

function DefaultLayout({ children }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  return (
    <section className={styles[`Layout-${theme}`]}>
      <Nav />
      <main className={styles[`Main-${theme}`]}>{children}</main>
      <Footer />
    </section>
  );
}

export default DefaultLayout;
