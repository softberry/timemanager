import React, { FC } from "react";

import Input, { DateTime } from "../../__ui/formElements";

const EditAppointment: FC = () => {
  return (
    <>
      <div>
        <Input name="contactName" label="Contact Name" type="text" required={true} validate={true} />

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
