import React from "react";
import {
  IReadOnlyContactProps,
  ButtonAlignmentEnums,
  IconNameEnums,
  ButtonTypeEnums,
} from "../../__typings/interfaces.d";

import Card, { CardTitle, CardBody } from "../../__ui/card";
import Button, { ButtonLink } from "../../__ui/buttons/button";

function ReadOnlyDetails({
  contact,
  editContactHandler,
}: IReadOnlyContactProps) {
  const { street, zip, city, tel, mobile, mail } = contact;

  return (
    <>
      <Card>
        <CardTitle>
          {`${contact.name} ${contact.surname}`}
          <Button
            align={ButtonAlignmentEnums.INLINE}
            icon={IconNameEnums.EDIT}
            onClick={() => {
              editContactHandler(contact, false);
            }}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={false}
          />
        </CardTitle>
        <CardBody>
          {street}, <br />
          {zip} - {city}
        </CardBody>
      </Card>
      <Card>
        <CardTitle>
          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconNameEnums.MAIL}
            href={`mailto:${mail}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={mail === undefined}
          />

          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconNameEnums.SMART_PHONE}
            href={`tel:${mobile}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={mobile === undefined}
          />

          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconNameEnums.PHONE}
            href={`tel:${tel}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={tel === undefined}
          />
        </CardTitle>
      </Card>
    </>
  );
}

export default ReadOnlyDetails;
