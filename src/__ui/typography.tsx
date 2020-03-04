import React, { useState, useEffect } from "react";
import {
  ITypographyProps,
  IMessageTypeEnums,
  DesignEnums,
} from "../__typings/interfaces.d";

import { useDispatch, useSelector } from "react-redux";
import webfontloader from "webfontloader";

function Typography({ theme = "default", children }: ITypographyProps) {
  const currentTheme = useSelector((state: any) => state.design.theme);
  const [fontsReady, setFontsReady] = useState<string>("LOADING");
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: theme should be apllied too!!!!
  }, [currentTheme]);

  const webFontsConfig = {
    google: {
      families: [
        "Allerta Stencil:400",
        "Exo:300,600",
        "Dosis:200,600",
        "Audiowide",
      ],
    },
    custom: {
      families: ["Material+Icons"],
      urls: [process.env.PUBLIC_URL + "/material-icons.css"],
    },
    active: () => {
      setFontsReady("LOADED");
    },
    inactive: () => {
      setFontsReady("ERRORED");
    },
    classes: false,
  };

  webfontloader.load(webFontsConfig);

  if (fontsReady === "ERRORED") {
    dispatch({
      type: IMessageTypeEnums.ERROR,
      message: {
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
      },
    });
  }
  return fontsReady === "LOADED" ? <>{children}</> : <div></div>;
}

/**
 * @returns Selected theme from store if avaliable, default orherwise
 */
function useTheme() {
  const theme = useSelector((state: any) => {
    switch (state.design.theme) {
      case DesignEnums.DEFAULT_THEME:
        return DesignEnums.DEFAULT_THEME;
      case DesignEnums.OCEAN_THEME:
        return DesignEnums.OCEAN_THEME;
      default:
        return DesignEnums.DEFAULT_THEME;
    }
  });
  return theme;
}
/**
 * @returns matching style object from given styles map
 * @param options {Map} list of imported styles matching with selected theme
 */
function useThemeStyle(options: any) {
  const theme = useTheme();
  return options.get(theme);
}

export { Typography as default, useTheme, useThemeStyle };
