import React from "react";
import {
  IReadOnlyContactProps,
  ButtonAlignmentEnums,
  IconEnums,
  ButtonTypeEnums,
} from "../../__typings/interfaces.d";

import Button, { ButtonLink } from "../../__ui/buttons/button";
import { H1 } from "../../__ui/headline/index";
function ReadOnlyDetails({
  contact,
  propsClass,
  editContactHandler,
}: IReadOnlyContactProps) {
  const { street, zip, city, tel, mobile, mail } = contact;
  const { styles, theme, view } = propsClass;

  return (
    <>
      <div className={styles[`ReadOnly-${theme}-${view}-Cart`]}>
        <div className={styles[`ReadOnly-${theme}-${view}-Cart-Title`]}>
          <H1>{`${contact.name} ${contact.surname}`}</H1>
          <Button
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.EDIT}
            onClick={() => {
              editContactHandler(contact, false);
            }}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={false}
          />
        </div>
        <div className={styles[`ReadOnly-${theme}-${view}-Address`]}>
          {street}, <br />
          {zip} - {city}{" "}
        </div>
      </div>
      <div className={styles[`ReadOnly-${theme}-${view}-Cart`]}>
        <div className={styles[`ReadOnly-${theme}-${view}-Contact-Buttons`]}>
          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.MAIL}
            href={`mailto:${mail}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={mail === undefined}
          />

          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.SMART_PHONE}
            href={`tel:${mobile}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={mobile === undefined}
          />

          <ButtonLink
            align={ButtonAlignmentEnums.INLINE}
            icon={IconEnums.PHONE}
            href={`tel:${tel}`}
            type={ButtonTypeEnums.SIMPLE}
            isDisabled={tel === undefined}
          />
        </div>
      </div>
    </>
  );
}

export default ReadOnlyDetails;
