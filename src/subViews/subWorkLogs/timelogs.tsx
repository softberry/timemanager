import React, { ReactElement } from "react";

import Input, { DateTime } from "../../__ui/formElements/index";
import { DateTimeValue, IInputCallback } from "../../__typings/interfaces.d";

import List from "../../components/list";

function TimeLogs({ id = 0 }): ReactElement {
  function dateTimeLohHandler({ start, finish, valid }: DateTimeValue): void {
    console.log(start, finish, valid);
  }
  function updateNotesHandler(note: IInputCallback): void {
    console.log(note);
  }
  return (
    <>
      <div>WORKED HOURS</div>
      <List>
        <div>
          <DateTime step={15} infoCallback={dateTimeLohHandler} />
          <Input
            infoCallback={updateNotesHandler}
            name={"Notes"}
            required={false}
            validate={false}
            uniqueName={""}
          />
        </div>
        <div>
          <DateTime step={15} infoCallback={dateTimeLohHandler} />
          <Input
            infoCallback={updateNotesHandler}
            name={"Notes"}
            required={false}
            validate={false}
            uniqueName={""}
          />
        </div>
        <div>
          <DateTime step={15} infoCallback={dateTimeLohHandler} />
          <Input
            infoCallback={updateNotesHandler}
            name={"Notes"}
            required={false}
            validate={false}
            uniqueName={""}
          />
        </div>
      </List>
    </>
  );
}

export default TimeLogs;
