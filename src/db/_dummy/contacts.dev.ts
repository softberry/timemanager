import { name, address, phone, internet } from "faker";

function createRandomContacts(num = 0) {
  function model() {
    return {
      name: name.firstName(),
      surname: name.lastName(),
      street: `${address.streetAddress()} ${address.streetSuffix()}`,
      zip: address.zipCode(),
      city: address.city(),
      tel: [phone.phoneNumber()],
      mobile: [phone.phoneNumber()],
      mail: [internet.email()]
    };
  }
  return new Array(num).fill("").map(() => model());
}

export { createRandomContacts };
