import React, { useState, useEffect } from "react";
import EventsCalendar from "../../__ui/eventsCalendar";
import { useSelector } from "react-redux";
import themeDefault from "./theme-default.module.scss";
import themeOcean from "./theme-ocean.module.scss";
import { VDESIGN } from "../../store/constant-enums";

export default function Cart({ state }: any) {
  const styles = useSelector((state: any) => {
    switch (state.design.theme) {
      case VDESIGN.DESIGN_THEME_OCEAN:
        return themeOcean;
      case VDESIGN.DESIGN_THEME_DEFAULT:
        return themeDefault;
      default:
        return themeDefault;
    }
  });

  const css: any = {
    hidden: `${styles.Cart}`,
    inline: `${styles.Cart} ${styles.CartInline}`,
    full: `${styles.Cart} ${styles.CartFull}`
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
      <div className={styles.CartDatePickerWrapper}>
        <EventsCalendar />
      </div>
    </div>
  );
}
