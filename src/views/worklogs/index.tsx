import React, { useState, useEffect } from "react";
import TYPES from "../../store/action-types";

import styles from "./worklogs.module.scss";
import List from "../../components/list";
import DefaultLayout from "../../layout/layout.default";

// TODO: This module currently not being used and must be re-written according to following issues:
//  https://github.com/softberry/timemanager/issues/40
//  https://github.com/softberry/timemanager/issues/32

function WorklogsView() {
  return (
    <DefaultLayout>
      <div className={styles.WorkLogs}></div>
    </DefaultLayout>
  );
}

export default WorklogsView;
