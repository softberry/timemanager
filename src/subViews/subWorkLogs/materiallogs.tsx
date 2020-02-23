import React from "react";
import Button from "../../__ui/buttons/button";
import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconEnums,
} from "../../__typings/interfaces.d";
import Card, { CardBody, CardTitle } from "../../__ui/card";
const MaterialLogs = ({ id = 0 }) => {
  return (
    <>
      <Card>
        <CardTitle>
          <div>Materials - Autocomplete</div>
          <Button
            isDisabled={false}
            onClick={() => {}}
            icon={IconEnums.ADD}
            align={ButtonAlignmentEnums.RIGHT}
            type={ButtonTypeEnums.POISITIVE}
          ></Button>
        </CardTitle>
        <CardBody>List of materials</CardBody>
      </Card>
    </>
  );
};

export default MaterialLogs;
