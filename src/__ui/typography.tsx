import React, { FunctionComponent, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import webfontloader from "webfontloader";

import TYPES from"../store/action-types";

type TypographyProps = {
  theme?: string;
  children?: any;
};
const Typography: FunctionComponent<TypographyProps> = ({
  theme = "default",
  children
}) => {
  const [fontsReady, setFontsReady] = useState<string>("LOADING");
  const dispatch = useDispatch();

  const webFontsConfig = {
    google: {
      families: ["Allerta Stencil:400", "Exo:300,600"]
    },
    custom: {
      families: ["Material+Icons"],
      urls: [process.env.PUBLIC_URL + "/material-icons.css"]
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
};

export default Typography;