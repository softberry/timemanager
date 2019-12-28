import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import webfontloader from "webfontloader";

import TYPES from "../store/types";

export default function Typography({ theme, children }) {
  const [fontsReady, setFontsReady] = useState("LOADING");
  const dispatch = useDispatch();

  const webFontsConfig = {
    google: {
      families: ["Allerta Stencil:400", "Exo:300,600"]
    },
    active: () => {
      setFontsReady("LOADED");
    },
    inactive: () => {
      setFontsReady("ERRORED");
    },
    classes: false
  };

  webfontloader.load(webFontsConfig);

  useEffect(() => {
    if (fontsReady === "LOADING") return;
  });

  if (fontsReady === "ERRORED") {
    dispatch({
      type: TYPES.MESSAGES_ERROR,
      caption: "Error loading Webfonts",
      body: (
        <>
          WebFonts Could not be loaded. Please check your internet connection.
          <br />
          <a href="/" target="_self">
            <strong>Reload</strong>
          </a>
        </>
      ),
      closable: true
    });
  }
  return fontsReady === "LOADED" ? <>{children}</> : <div></div>;
}
