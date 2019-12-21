import React from "react";
import { useDispatch } from "react-redux";

import { toolbar } from "../../store/action-types";
import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

export default function Home() {
  useDispatch()({ type: toolbar.HOME });

  return (
    <DefaultLayout>
      <Timer />
    </DefaultLayout>
  );
}
