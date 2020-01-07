import React, { useState, useEffect } from "react";
import EventsCalendar from "../eventsCalendar";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { useTheme, useThemeStyle } from "../../__ui/typography";
import { VDESIGN } from "../../store/constant-enums";

const stylesMap = new Map();
stylesMap.set(VDESIGN.DESIGN_THEME_OCEAN, themeOcean);
stylesMap.set(VDESIGN.DESIGN_THEME_DEFAULT, themeDefault);

export default function Cart({ state }: any) {
  const theme = useTheme();
  const styles = useThemeStyle(stylesMap);

  const css: any = {
    hidden: styles[`Cart-${theme}`],
    inline: `${styles[`Cart-${theme}`]} ${styles[`Cart-${theme}-Inline`]}`,
    full: `${styles[`Cart-${theme}`]} ${styles[`Cart-${theme}-CartFull`]}`
  };
  const [position, setPosition] = useState<string>(css.hidden);

  useEffect(() => {
    if (state && state.cart && state.cart.position) {
      setPosition(state.cart.position);
    } else {
      setPosition("hidden");
    }

    if (position === css.hidden) return;
  }, [css, position, state]);

  return (
    <div className={css[position]}>
      <div className={styles[`Cart-${theme}-DatePickerWrapper`]}>
        <EventsCalendar />
      </div>
    </div>
  );
}
