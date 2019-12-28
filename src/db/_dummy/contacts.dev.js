import faker from "faker";

function createRandomContacts(num = 0) {
  function model() {
    return {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      street: `${faker.address.streetAddress()} ${faker.address.streetSuffix()}`,
      zip: faker.address.zipCode(),
      city: faker.address.city(),
      tel: [faker.phone.phoneNumber()],
      mobile: [faker.phone.phoneNumber()],
      mail: [faker.internet.email()]
    };
  }
  return new Array(num).fill("").map(() => model());
}

export { createRandomContacts };
