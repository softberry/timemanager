import React, { ChangeEvent } from "react";

import Input, { DateTime } from "../../__ui/formElements/index";
import Card, { CardTitle, CardBody } from "../../__ui/card";
import { DateTimeValue, IInputCallback } from "../../__typings/interfaces.d";

function TimeLogs({ id = 0 }) {
  function dateTimeLohHandler({ start, finish, valid }: DateTimeValue) {
    console.log(start, finish, valid);
  }
  function updateNotesHandler(note: IInputCallback) {
    console.log(note);
  }
  return (
    <>
      <Card>
        <CardTitle>
          <div>WORKED HOURS</div>
        </CardTitle>
        <CardBody>
          <DateTime step={15} infoCallback={dateTimeLohHandler} />
          <Input
            infoCallback={updateNotesHandler}
            name={"Notes"}
            required={false}
            validate={false}
            uniqueName={""}
          />
        </CardBody>
      </Card>
    </>
  );
}

export default TimeLogs;
