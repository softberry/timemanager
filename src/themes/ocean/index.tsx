import React from "react";
import { useDispatch } from "react-redux";
import webfontloader from "webfontloader";
import TYPES from "../../store/action-types";

import "./index.scss";

export default () => {
  const dispatch = useDispatch();
  const webFontsConfig = {
    google: {
      families: ["Shadows+Into+Light", "Audiowide"],
    },
    inactive: () => {
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
        closable: true,
      });
    },
    classes: false,
  };

  webfontloader.load(webFontsConfig);
  return <></>;
};
