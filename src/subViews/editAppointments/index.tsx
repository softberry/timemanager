import React, { FunctionComponent } from "react";

import Input, { DateTime } from "../../__ui/formElements";

const EditAppointment: FunctionComponent = () => {
  return (
    <>
      <div>
        <Input name="contactName" label="Select contact" type="text" required={true} validate={false} />

        <DateTime
          step={15}
          infoCallback={(): void => {
            //
          }}
        />
        <Input name="description" label="description" type="text" required={true} validate={false} />
      </div>
    </>
  );
};

export default EditAppointment;
