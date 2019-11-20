import webfontloader from "webfontloader";
import React from "react";

export default function Typography({ theme, children }) {
  webfontloader.load({
    google: {
      families: ["Allerta Stencil:400", "Exo:300,600", "Material+Icons"]
    }
  });

  return <>{children}</>;
}

