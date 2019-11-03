import React from "react";
// import styles from "./home.module.scss";

import DefaultLayout from "../../layout/layout.default";
import Timer from "../../components/timer";

// temporary dummy data
// const history = [

//   { customer: "Max Mustermann", date: "2019-10-24", duration: "00:30" },
//   { customer: "Matt Muttermann", date: "2018-11-01", duration: "02:30" },
//   { customer: "M. Jemand", date: "2018-01-05", duration: "02:315" }
// ];
// <List title="Test" content={history} />
export default function Home(props) {
  return (
    <DefaultLayout>
      <Timer />
    </DefaultLayout>
  );
}
