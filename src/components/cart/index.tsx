import React, { useState, useEffect } from "react";
import EventsCalendar from "../../__ui/eventsCalendar";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

export default function Cart({ state }: any) {
  let theme = VDESIGN.DESIGN_THEME_DEFAULT;
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
      default:
        theme = VDESIGN.DESIGN_THEME_DEFAULT;
        return themeDefault;
    }
  });

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
