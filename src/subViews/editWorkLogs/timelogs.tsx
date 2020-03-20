import React, { ReactElement } from "react";
import Tipp from "../../__ui/tipp";
import Button from "../../__ui/buttons/button";
// import Input, { DateTime } from "../../__ui/formElements/index";

import { IconNameEnums, ButtonTypeEnums, ButtonAlignmentEnums } from "../../__typings/interfaces.d";

import { CardTitle } from "../../__ui/card";

function TimeLogs({ id = 0 }): ReactElement {
  function createTimeLoghandler(): void {
    //TODO: to be done
  }
  return (
    <>
      <CardTitle>Spent time</CardTitle>
      <Tipp>Add Remove logs that you spend for this assignment here.</Tipp>
      <Button
        icon={IconNameEnums.ADD}
        isDisabled={false}
        type={ButtonTypeEnums.SIMPLE}
        align={ButtonAlignmentEnums.CENTER}
        onClick={createTimeLoghandler}
      />
    </>
  );
}

export default TimeLogs;
