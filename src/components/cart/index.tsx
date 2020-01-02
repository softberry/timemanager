import React, { useState, useEffect } from "react";
import EventsCalendar from "../../__ui/eventsCalendar";
import styles from "./cart.module.scss";

export default function Cart({ state }: any) {
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
