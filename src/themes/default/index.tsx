import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import webfontloader from "webfontloader";

import "./index.scss";
import { DialogTypes, IDialogActionEnums } from "../../__typings/interfaces.d";
import { uuid } from "@nano-sql/core/lib/utilities";

export default (): ReactElement => {
  const dispatch = useDispatch();
  const webFontsConfig = {
    google: {
      families: ["Allerta Stencil:400", "Exo:300,600"],
    },
    inactive: (): void => {
      dispatch({
        type: IDialogActionEnums.OPEN,
        message: {
          dialogType: DialogTypes.ERROR,
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
          dialogId: uuid(),
        },
      });
    },
    classes: false,
  };

  webfontloader.load(webFontsConfig);
  return <></>;
};
