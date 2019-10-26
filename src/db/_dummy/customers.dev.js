import faker from "faker";



function createRandomContacts(num = 0) {
  const contacts = new Array(num).fill('');

  const results = contacts.map((contact, id) => {
    return {
      id: `dummy-data-${id}`,
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      street: `${faker.address.streetAddress()} ${faker.address.streetSuffix()}`,
      zip: faker.address.zipCode(),
      city: faker.address.city(),
      tel: [faker.phone.phoneNumber()],
      mobile: [faker.phone.phoneNumber()],
      mail: [faker.internet.email()]
    };
  });
  
  return results;
}



export default createRandomContacts;
