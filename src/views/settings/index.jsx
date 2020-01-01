import React from "react";

import Settings from "../../components/settings";
import DefaultLayout from "../../layout/layout.default";

export default function() {
  return (
    <DefaultLayout>
      <Settings view="secondary" />
    </DefaultLayout>
  );
}
