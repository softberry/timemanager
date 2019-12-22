import React from "react";
import { useDispatch } from "react-redux";

import TYPES from "../../store/types";
import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

export default function Home() {
  useDispatch()({ type: TYPES.HOME });

  return (
    <DefaultLayout>
      <Timer />
    </DefaultLayout>
  );
}
