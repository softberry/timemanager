import React, { ReactElement } from "react";
import Button from "../../__ui/buttons/button";
import Tipp from "../../__ui/tipp";
import { ButtonTypeEnums, ButtonAlignmentEnums, IconNameEnums } from "../../__typings/interfaces.d";
import { CardTitle } from "../../__ui/card";
function MaterialLogs({ id = 0 }): ReactElement {
  function createMaterialLoghandler(): void {
    //TODO: to be done
  }
  return (
    <>
      <CardTitle>Used Materials</CardTitle>
      <Tipp>Add Remove materials that you used for this assignment here.</Tipp>
      <Button
        icon={IconNameEnums.ADD}
        isDisabled={false}
        type={ButtonTypeEnums.SIMPLE}
        align={ButtonAlignmentEnums.CENTER}
        onClick={createMaterialLoghandler}
      />
    </>
  );
}

export default MaterialLogs;
