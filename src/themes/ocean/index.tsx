import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import webfontloader from "webfontloader";

import "./index.scss";
import { IMessageTypeEnums } from "../../__typings/interfaces.d";

export default (): ReactElement => {
  const dispatch = useDispatch();
  const webFontsConfig = {
    google: {
      families: ["Shadows+Into+Light", "Audiowide"],
    },
    inactive: (): void => {
      dispatch({
        type: IMessageTypeEnums.ERROR,
        message: {
          caption: "Error loading Webfonts",
          body: (
            <>
              WebFonts Could not be loaded. Please check your internet
              connection.
              <br />
              <a href="/" target="_self">
                <strong>Reload</strong>
              </a>
            </>
          ),
          closable: true,
        },
      });
    },
    classes: false,
  };

  webfontloader.load(webFontsConfig);
  return <></>;
};
