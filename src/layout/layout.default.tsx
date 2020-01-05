import React from "react";
import { useSelector } from "react-redux";

import Nav from "../components/nav";
import Footer from "../components/footer";

import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../store/constant-enums";

export default function DefaultLayout({ children }: any) {
  let theme = VDESIGN.DESIGN_THEME_DEFAULT;
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_OCEAN;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });
  return (
    <section className={styles[`Layout-${theme}`]}>
      <Nav />
      <main className={styles[`Main-${theme}`]}>{children}</main>
      <Footer />
    </section>
  );
}
