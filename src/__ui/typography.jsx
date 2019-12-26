import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import webfontloader from "webfontloader";

import TYPES from "../store/types";

export default function Typography({ theme, children }) {
  const [fontsReady, setFontsReady] = useState(false);
  const dispatch = useDispatch();

  const webFontsConfig = {
    google: {
      families: ["Allerta Stencil:400", "Exo:300,600", "Material+Icons"]
    },
    active: () => {
      setFontsReady(true);
    },
    inactive: () => {
      setFontsReady(false);
    },
    classes: false
  };

  webfontloader.load(webFontsConfig);

  useEffect(() => {
    if (!fontsReady) return;
  });

  if (!fontsReady) {
    dispatch({
      type: TYPES.MESSAGES_ERROR,
      caption: "Error loading Webfonts",
      text:
        "WebFonts Could not be loaded. Please check your internet connection.",
      closable: true
    });
  }
  return fontsReady ? <>{children}</> : <div></div>;
}
