import webfontloader from "webfontloader";
import React from "react";

export default function Typography({ theme, children }) {
  webfontloader.load({
    google: {
      families: ["Exo", "Droid Serif"]
    }
  });

  return <>{children}</>;
}
