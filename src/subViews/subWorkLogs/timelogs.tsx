import React from "react";
import Button from "../../__ui/buttons/button";
import Card, { CardTitle, CardBody } from "../../__ui/card";
import {
  ButtonTypeEnums,
  ButtonAlignmentEnums,
  IconEnums,
} from "../../__typings/interfaces.d";
const TimeLogs = ({ id = 0 }) => {
  return (
    <>
      <Card>
        <CardTitle>
          <div>WORKED HOURS</div>
          <Button
            isDisabled={false}
            onClick={() => {}}
            icon={IconEnums.ADD}
            align={ButtonAlignmentEnums.RIGHT}
            type={ButtonTypeEnums.POISITIVE}
          ></Button>
        </CardTitle>
        <CardBody>
          <p>Start:DD/MM/YYY-HH:mm</p>
          <p>Finished:DD/MM/YYY-HH:mm</p>
          <p>Duration</p>
          <p>Notes</p>
        </CardBody>
      </Card>
    </>
  );
};

export default TimeLogs;
