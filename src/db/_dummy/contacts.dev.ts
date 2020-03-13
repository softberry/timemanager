import { name, address, phone, internet } from "faker/locale/de";
import { IContactsTableModel } from "../../__typings/interfaces";
import { uuid } from "@nano-sql/core/lib/utilities";

function createRandomContacts(num = 0): IContactsTableModel[] {
  function model(): IContactsTableModel {
    return {
      id: uuid(),
      name: name.firstName(),
      surname: name.lastName(),
      street: `${address.streetAddress()} ${address.streetSuffix()}`,
      zip: address.zipCode(),
      city: address.city(),
      tel: [phone.phoneNumber()],
      mobile: [phone.phoneNumber()],
      mail: [internet.email()],
    };
  }
  return new Array(num).fill("").map(() => model());
}

export { createRandomContacts };
